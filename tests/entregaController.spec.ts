import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import EntregaController from '../src/controllers/entregaController';
import IentregaService from '../src/services/IentregaService';
import IGenericResponseDto from '../src/types/IgenericResponseDto';

describe('EntregaController', () => {
    let app: express.Express;
    let mockService: Partial<IentregaService>;
    let controller: EntregaController;

    beforeEach(() => {
        // Mock the service
        mockService = {
            list: vi.fn(),
            getById: vi.fn(),
            create: vi.fn(),
        };

        // Create an instance of the controller with the mocked service
        controller = new EntregaController(mockService as IentregaService);

        // Create an Express app and mount the controller
        app = express();
        app.use(express.json());

        // Define routes
        app.get('/entregas', (req: Request, res: Response, next: NextFunction) => controller.list(req, res, next));
        app.get('/entregas/:id', (req: Request, res: Response, next: NextFunction) => controller.getById(req, res, next));
        app.post('/entregas', (req: Request, res: Response, next: NextFunction) => controller.create(req, res, next));

        // Middleware to handle errors
        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            const status = err.status || 500;
            const response: IGenericResponseDto = {
                success: false,
                status,
                data: null,
                message: err.message,
            };
            res.status(status).json(response);
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('list', () => {
        it('should return a list of entregas with count', async () => {
            const mockData = [
                { id: 1, nome: 'Entrega 1', data: new Date().toISOString() },
                { id: 2, nome: 'Entrega 2', data: new Date().toISOString() },
            ];
            const mockCount = 2;

            (mockService.list as vi.Mock).mockResolvedValue({ data: mockData, count: mockCount });

            const res = await request(app).get('/entregas?limit=10&offset=0');

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toEqual({
                success: true,
                status: httpStatus.OK,
                data: { entregas: mockData, count: mockCount }
            });
            expect(mockService.list).toHaveBeenCalledWith(10, 0);
        });
    });

    describe('getById', () => {
        it('should return a entrega by id', async () => {
            const mockData = { id: 1, nome: 'Entrega 1', data: new Date().toISOString() };

            (mockService.getById as vi.Mock).mockResolvedValue(mockData);

            const res = await request(app).get('/entregas/1');

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toEqual({
                success: true,
                status: httpStatus.OK,
                data: mockData
            });
            expect(mockService.getById).toHaveBeenCalledWith(1);
        });
    });

    describe('create', () => {
        it('should create a new entrega', async () => {
            const createRequest = {
                nome: 'Nova Entrega',
                data: new Date().toISOString(),
                partida: { lat: '1', long: '1' },
                destino: { lat: '2', long: '2' }
            };

            const mockData = { id: 1, nome: createRequest.nome, data: new Date(createRequest.data).toISOString() };

            (mockService.create as vi.Mock).mockResolvedValue(mockData);

            const res = await request(app).post('/entregas').send(createRequest);

            expect(res.status).toBe(httpStatus.CREATED);
            expect(res.body).toEqual({
                success: true,
                status: httpStatus.CREATED,
                data: mockData
            });
            expect(mockService.create).toHaveBeenCalledWith({
                nome: createRequest.nome,
                data: new Date(createRequest.data),
                partida: createRequest.partida,
                destino: createRequest.destino
            });
        });
    });
});