import httpStatus from "http-status";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import BaseError from "../src/errors/baseError";
import Entrega from "../src/models/Entrega";
import IentregaRepository from "../src/repositorys/IentregaRepository";
import EntregaService from "../src/services/entregaService";
import IcreateEntregaRequest from "../src/types/IcreateEntregaRequest";

describe('EntregaService', () => {
    let mockRepository: Partial<IentregaRepository>;
    let service: EntregaService;

    beforeEach(() => {
        mockRepository = {
            list: vi.fn(),
            getById: vi.fn(),
            create: vi.fn(),
        };

        service = new EntregaService(mockRepository as IentregaRepository);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('list', () => {
        it('should return a list of entregas with count', async () => {
            const mockData = [
                {
                    id: 1,
                    nome: 'Entrega 1',
                    data: new Date(),
                    CoordenadasPartida: { lat: '1.1', long: '1.2' },
                    CoordenadasDestino: { lat: '2.1', long: '2.2' },
                },
                {
                    id: 2,
                    nome: 'Entrega 2',
                    data: new Date(),
                    CoordenadasPartida: { lat: '3.1', long: '3.2' },
                    CoordenadasDestino: { lat: '4.1', long: '4.2' },
                }
            ];
            const mockCount = 2;

            (mockRepository.list as vi.Mock).mockResolvedValue({ data: mockData, count: mockCount });

            const result = await service.list(10, 0);

            expect(result).toEqual({
                data: mockData.map(item => new Entrega(item.id, item.nome, item.data, { lat: item.CoordenadasPartida.lat, long: item.CoordenadasPartida.long }, { lat: item.CoordenadasDestino.lat, long: item.CoordenadasDestino.long })),
                count: mockCount,
            });
            expect(mockRepository.list).toHaveBeenCalledWith(10, 0);
        });

        it('should return an empty list and zero count if no entregas are found', async () => {
            (mockRepository.list as vi.Mock).mockResolvedValue({ data: [], count: 0 });

            const result = await service.list(10, 0);

            expect(result).toEqual({
                data: [],
                count: 0,
            });
            expect(mockRepository.list).toHaveBeenCalledWith(10, 0);
        });
    });

    describe('getById', () => {
        it('should return a entrega by id', async () => {
            const mockData = {
                id: 1,
                nome: 'Entrega 1',
                data: new Date(),
                CoordenadasPartida: { lat: '1.1', long: '1.2' },
                CoordenadasDestino: { lat: '2.1', long: '2.2' },
            };

            (mockRepository.getById as vi.Mock).mockResolvedValue(mockData);

            const result = await service.getById(1);

            expect(result).toEqual(new Entrega(mockData.id, mockData.nome, mockData.data, { lat: mockData.CoordenadasPartida.lat, long: mockData.CoordenadasPartida.long }, { lat: mockData.CoordenadasDestino.lat, long: mockData.CoordenadasDestino.long }));
            expect(mockRepository.getById).toHaveBeenCalledWith(1);
        });

        it('should throw an error if entrega not found', async () => {
            (mockRepository.getById as vi.Mock).mockResolvedValue(null);

            await expect(service.getById(1)).rejects.toThrow(new BaseError(httpStatus.NOT_FOUND, `Entrega com id 1 não encontrada`));
            expect(mockRepository.getById).toHaveBeenCalledWith(1);
        });
    });

    describe('create', () => {
        it('should create a new entrega', async () => {
            const createRequest: IcreateEntregaRequest = {
                nome: 'Nova Entrega',
                data: new Date(),
                partida: { lat: '1', long: '1' },
                destino: { lat: '2', long: '2' }
            };

            const mockData = {
                id: 1,
                nome: createRequest.nome,
                data: createRequest.data,
                CoordenadasPartida: { lat: '1', long: '1' },
                CoordenadasDestino: { lat: '2', long: '2' },
            };

            (mockRepository.create as vi.Mock).mockResolvedValue(mockData);

            const result = await service.create(createRequest);

            expect(result).toEqual(new Entrega(mockData.id, mockData.nome, mockData.data, { lat: mockData.CoordenadasPartida.lat, long: mockData.CoordenadasPartida.long }, { lat: mockData.CoordenadasDestino.lat, long: mockData.CoordenadasDestino.long }));
            expect(mockRepository.create).toHaveBeenCalledWith(createRequest);
        });

        it('should throw an error if create fails', async () => {
            const createRequest: IcreateEntregaRequest = {
                nome: 'Nova Entrega',
                data: new Date(),
                partida: { lat: '1', long: '1' },
                destino: { lat: '2', long: '2' }
            };

            (mockRepository.create as vi.Mock).mockRejectedValue(new BaseError(httpStatus.BAD_REQUEST, 'Invalid data'));

            await expect(service.create(createRequest)).rejects.toThrow(new BaseError(httpStatus.BAD_REQUEST, 'Invalid data'));
            expect(mockRepository.create).toHaveBeenCalledWith(createRequest);
        });
    });
});