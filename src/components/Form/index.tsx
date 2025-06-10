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
      <h2 className="text-lg font-bold mb-4">Create Lifestyle Plan</h2>

      <input
        {...register("nombre", { required: true })}
        placeholder="Your name"
        className="input"
      />
      {errors.nombre && <p className="error">This field is required</p>}

      <input
        type="number"
        {...register("edad", { required: true, min: 0 })}
        placeholder="Age"
        className="input"
      />
      {errors.edad && <p className="error">Valid age is required</p>}

      <input
        {...register("ocupacion", { required: true })}
        placeholder="Current occupation"
        className="input"
      />
      {errors.ocupacion && <p className="error">This field is required</p>}

      <textarea
        {...register("objetivosProfesionales", { required: true })}
        placeholder="Professional goals"
        className="input"
      />
      {errors.objetivosProfesionales && (
        <p className="error">Please enter your goals</p>
      )}

      <label className="block">Physical activity level</label>
      <select {...register("nivelActividad")} className="input">
        <option value="alto">High</option>
        <option value="medio">Medium</option>
        <option value="bajo">Low</option>
      </select>

      <textarea
        {...register("intereses")}
        placeholder="What hobbies or activities are you interested in?"
        className="input"
      />

      <textarea
        {...register("restriccionesAlimenticias")}
        placeholder="Do you have any dietary restrictions?"
        className="input"
      />

      <textarea
        {...register("horarioDisponible")}
        placeholder="Weekly availability"
        className="input"
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Plan
        </button>
        <button
          onClick={() => setShowForm(false)}
          type="button"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
