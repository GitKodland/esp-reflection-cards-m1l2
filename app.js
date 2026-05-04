// ==========================
// 📸 DESCARGAR COMO IMAGEN HD
// ==========================
function downloadImage() {

    const element = document.getElementById("cards");

    // corrección de recorte
    window.scrollTo(0, 0);

    html2canvas(element, {
        scale: window.devicePixelRatio * 2, // 🔥 excelente calidad
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {

        const link = document.createElement('a');
        link.download = 'reflexion_hd.png';
        link.href = canvas.toDataURL("image/png", 1.0);

        link.click();
    });
}
// ==========================
// 🤖 RETROALIMENTACIÓN DE IA
// ==========================
async function generateFeedback() {

    const tried = document.getElementById("tried").value.trim();
    const stuck = document.getElementById("stuck").value.trim();
    const solution = document.getElementById("solution").value.trim();

    const feedbackEl = document.getElementById("feedback");

    // UX: verificación
    if (!tried || !stuck || !solution) {
        feedbackEl.innerText = "⚠️ Completa todas las tarjetas";
        return;
    }

    feedbackEl.innerText = "🤖 Pensando...";

    try {

        // ==========================
        // LLAMADA AL BACKEND (¡IMPORTANTE!)
        // ==========================
        const res = await fetch("/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tried,
                stuck,
                solution
            })
        });

        if (!res.ok) throw new Error("Error de IA");

        const data = await res.json();

        feedbackEl.innerText = data.feedback;

    } catch (e) {

        // ==========================
        // 🧠 ALTERNATIVA LOCAL (SOLUCIÓN INTELIGENTE)
        // ==========================
        feedbackEl.innerText = generateLocalFeedback(tried, stuck, solution);
    }
}


// ==========================
// 🧠 RETROALIMENTACIÓN LOCAL (si la IA no está disponible)
// ==========================
function generateLocalFeedback(tried, stuck, solution) {

    let feedback = "💬 Retroalimentación:\n\n";

    // 1. Intentó
    if (tried.length < 20) {
        feedback += "👉 Intenta describir tu idea con más claridad.\n";
    } else {
        feedback += "✅ ¡Genial! Has hecho un gran trabajo explicando lo que intentaste hacer.\n";
    }

    // 2. Problema
    if (stuck.length < 10 || stuck.includes("no sé")) {
        feedback += "👉 Intenta analizar tu problema.\n";
    } else {
        feedback += "👍 ¡Genial! Tienes una comprensión clara del problema que hay que solucionar.\n";
    }

    // 3. Solución
    if (solution.length < 10) {
        feedback += "👉 ¿Qué quieres mejorar? Intenta agregar pasos claros y fáciles de seguir.\n";
    } else {
        feedback += "🚀 ¡Una buena solución! ¡Piensas como un verdadero desarrollador!\n";
    }

    feedback += "\n✨ ¡Sigue así! ¡Vas por buen camino!";

    return feedback;
}
