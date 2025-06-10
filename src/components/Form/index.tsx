import { useForm } from "react-hook-form";
import "./formStyles.css";

export interface LifestyleFormValues {
  nombre: string;
  edad: number;
  ocupacion: string;
  objetivosProfesionales: string;
  nivelActividad: "alto" | "medio" | "bajo";
  intereses: string;
  restriccionesAlimenticias: string;
  horarioDisponible: string;
}

export const LifestyleForm = ({
  onSubmit,
  setShowForm,
}: {
  onSubmit: (data: LifestyleFormValues) => void;
  setShowForm: (show: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LifestyleFormValues>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-white max-w-xl mx-auto"
    >
      <h2 className="text-lg font-bold mb-4">Crear Plan de Estilo de Vida</h2>

      <input
        {...register("nombre", { required: true })}
        placeholder="Tu nombre"
        className="input"
      />
      {errors.nombre && <p className="error">Este campo es obligatorio</p>}

      <input
        type="number"
        {...register("edad", { required: true, min: 0 })}
        placeholder="Edad"
        className="input"
      />
      {errors.edad && <p className="error">Edad válida requerida</p>}

      <input
        {...register("ocupacion", { required: true })}
        placeholder="Ocupación actual"
        className="input"
      />
      {errors.ocupacion && <p className="error">Este campo es obligatorio</p>}

      <textarea
        {...register("objetivosProfesionales", { required: true })}
        placeholder="Objetivos profesionales"
        className="input"
      />
      {errors.objetivosProfesionales && (
        <p className="error">Escribe tus objetivos</p>
      )}

      <label className="block">Nivel de actividad física</label>
      <select {...register("nivelActividad")} className="input">
        <option value="alto">Alto</option>
        <option value="medio">Medio</option>
        <option value="bajo">Bajo</option>
      </select>

      <textarea
        {...register("intereses")}
        placeholder="¿Qué hobbies o actividades te interesan?"
        className="input"
      />

      <textarea
        {...register("restriccionesAlimenticias")}
        placeholder="¿Tienes restricciones alimenticias?"
        className="input"
      />

      <textarea
        {...register("horarioDisponible")}
        placeholder="Disponibilidad semanal"
        className="input"
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Generar plan
        </button>
        <button
          onClick={() => setShowForm(false)}
          type="button"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
