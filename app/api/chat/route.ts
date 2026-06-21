import { NextRequest } from 'next/server'
import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are the DevForge AI Assistant — a helpful, knowledgeable expert on DevForge, an agentic AI-powered CLI tool for DevOps pipeline generation.

You help users with:
- Installation & setup (npm install -g @apurvv28/devforge, npx devforge init)
- Core CLI commands: init, update, preview, rollback, audit, deploy, diagnose, jenkins setup, agent, cache, memory:stats, recommendations
- Agent system: LLM provider setup (Amazon Nova Pro, Gemini, OpenAI, Anthropic, Bedrock), LangGraph orchestration, cache, and cross-session memory
- Security & compliance: NIST SP 800-53, ISO 27001 scanning, auto-fix, Trivy integration
- Infrastructure as Code: Terraform, CDK, Pulumi, Ansible detection, generation, and verification
- Offline/air-gapped mode support
- Deployment automation with AWS CLI
- CI/CD integrations (Jenkins setup and webhook configuration)

Key facts:
- DevForge supports --no-agent flag to run fully offline without LLM
- devforge audit --security --fix --yes runs compliance scanning with auto-fix
- The agent uses LangGraph for stateful orchestration with cross-session Elasticsearch memory
- Transactional file writes with rollback on failure are supported
- Memory is backed by Amazon Elastic (Elasticsearch) with ELASTICSEARCH_URL and ELASTICSEARCH_API_KEY
- Cache can be inspected with devforge cache stats, cleared with devforge cache clear, and Redis connectivity can be tested with devforge cache test-elasticache
- devforge jenkins setup automates creation of Jenkins pipeline SCM jobs and GitHub webhook registration
- devforge agent status and devforge agent reset check and clear provider credentials/credentials cache
- devforge agent graph status and devforge agent graph reset check and clear local/distributed LangGraph checkpoint state
- devforge recommendations dismiss <id> dismisses specific recommendation warnings permanently (stored in .devforge/)

Be concise, accurate, and friendly. Use code blocks for commands. If you don't know something specific, say so honestly rather than guessing. Always reference DevForge documentation when relevant.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const apiKey = process.env.NVIDIA_GLM_OPENAI_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    })

    const completion = await openai.chat.completions.create({
      model: 'z-ai/glm-5.1',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 1,
      top_p: 1,
      max_tokens: 16384,
      stream: true,
    })

    // Create a ReadableStream for SSE
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              )
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Stream error'
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`)
          )
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
