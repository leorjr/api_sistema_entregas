import EntregaController from "../controllers/entregaController";
import EntregaRepository from "../repositorys/entregaRepository";
import EntregaService from "../services/entregaService";

class EntregaFactory {
	static createController() {
		const repository = new EntregaRepository();
		const service = new EntregaService(repository);
		return new EntregaController(service);
	}
}

export default EntregaFactory