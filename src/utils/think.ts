import { LifestyleFormValues } from "../components/Form";

export const thinkReplacement = (text: string) => {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
};

export function formatLLMTextToHTML(input: string): string {
  let formatted = input;

  formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  formatted = formatted.replace(
    /(\d+)\.\s(.+?)(?=\d+\.|\n|$)/gs,
    (_, num, item) => {
      const lines = item
        .trim()
        .split("\n")
        .map((line) => `<li>${line.trim()}</li>`)
        .join("");
      return `<ol start="${num}">${lines}</ol>`;
    }
  );

  formatted = formatted.replace(
    /(?:^|\n)[-–•]\s(.+?)(?=\n[-–•]|\n\d+\.|\n|$)/gs,
    (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((line) => {
          const cleaned = line.replace(/^[-–•]\s/, "");
          return `<li>${cleaned}</li>`;
        })
        .join("");
      return `<ul>${items}</ul>`;
    }
  );

  formatted = formatted.replace(/\n+/g, "<br/>");

  return formatted.trim();
}

export function generatePromptFromForm(data: LifestyleFormValues): string {
  return `Hola, soy ${data.nombre}, tengo ${data.edad} años y trabajo como ${data.ocupacion}. 
Mis objetivos profesionales son: ${data.objetivosProfesionales}.
Mi nivel de actividad física es ${data.nivelActividad}.
Estoy interesado en: ${data.intereses}.
Mis restricciones alimenticias son: ${data.restriccionesAlimenticias}.
Mi disponibilidad semanal es: ${data.horarioDisponible}.

Por favor, genera un plan de estilo de vida personalizado que incluya:
- Plan profesional
- Plan de entrenamiento
- Plan de hobbies
- Plan de nutrición

Usa un lenguaje claro y organizado por secciones.`;
}
