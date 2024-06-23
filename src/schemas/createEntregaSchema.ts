import * as yup from "yup";

const createEntregaSchema = yup.object().shape({
	nome: yup.string().min(3, "nome deve ter ao menos 3 caracteres").required("nome é obrigatório"),
	data: yup.date().required("data é obrigatória").typeError("data deve estar no formato YYYY-MM-DD"),
	partida: yup.object().shape({
		lat: yup.string().required("lat em partida é obrigatório"),
		long: yup.string().required("long em partida é obrigatório")
	}),
	destino: yup.object().shape({
		lat: yup.string().required("lat em destino é obrigatório"),
		long: yup.string().required("long em destino é obrigatório")
	}),
});

export default createEntregaSchema;