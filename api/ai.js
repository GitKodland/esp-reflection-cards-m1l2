export default async function handler(req, res) {

    const { tried, stuck, solution } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
Eres un mentor amable para niños de 10 a 12 años.

- Elogia los intentos
- Ofrece sugerencias con amabilidad
- No critiques
- Responde de forma sencilla y clara
- Limita la evaluación a 4 o 5 oraciones
`
                },
                {
                    role: "user",
                    content: `
Intentó: ${tried}
El problema: ${stuck}
La solución: ${solution}
`
                }
            ]
        })
    });

    const data = await response.json();

    res.status(200).json({
        feedback: data.choices[0].message.content
    });
}
