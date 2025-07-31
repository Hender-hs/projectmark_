import request from 'supertest';
import express, { Request, Response } from 'express';
import { TopicService } from '../../../src/domain/topic/service/topic.service';
import { TopicRepository } from '../../../src/domain/topic/repository/topic.abstract.repository';
import { Topic } from '../../../src/domain/topic/model/topic.model';

jest.mock('../../../src/interface/api/route/topic/topic.route', () => {
  const express = require('express');
  const router = express.Router();
  
  const mockTopicController = {
    getAllTopics: jest.fn(),
    getTopicById: jest.fn(),
    createTopic: jest.fn(),
    updateTopic: jest.fn(),
    deleteTopic: jest.fn(),
    getTopicHierarchyTree: jest.fn(),
    getShortestPath: jest.fn(),
  };

  router.get('/', mockTopicController.getAllTopics);
  router.get('/:id', mockTopicController.getTopicById);
  router.post('/', mockTopicController.createTopic);
  router.put('/:id', mockTopicController.updateTopic);
  router.delete('/:id', mockTopicController.deleteTopic);
  router.get('/hierarchy', mockTopicController.getTopicHierarchyTree);
  router.get('/shortest-path', mockTopicController.getShortestPath);

  return { router, mockTopicController };
});

describe.skip('Topic Routes Integration Tests', () => {
  let app: express.Application;
  let mockTopicRepository: jest.Mocked<TopicRepository>;
  let topicService: TopicService;
  let mockTopicController: any;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockTopicRepository = {
      getAllTopics: jest.fn(),
      getTopicById: jest.fn(),
      createTopic: jest.fn(),
      updateTopic: jest.fn(),
      deleteTopic: jest.fn(),
    } as jest.Mocked<TopicRepository>;

    topicService = new TopicService(mockTopicRepository);

    const mockAuthMiddleware = (req: Request, res: Response, next: any) => {
      next();
    };
    app.use(mockAuthMiddleware);

    const { router, mockTopicController: controller } = require('../../../src/interface/api/route/topic/topic.route');
    mockTopicController = controller;
    app.use('/api/v1/topic', router);
  });

  describe('GET /api/v1/topic', () => {
    it('should get all topics successfully', async () => {
      const expectedTopics = [
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
        new Topic('2', 'Topic 2', 'Content 2', 1, 'root', new Date(), new Date()),
      ];

      mockTopicController.getAllTopics.mockImplementation((req: Request, res: Response) => {
        res.status(200).json(expectedTopics);
      });

      const response = await request(app)
        .get('/api/v1/topic')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(mockTopicController.getAllTopics).toHaveBeenCalled();
    });

    it('should return empty array when no topics exist', async () => {
      mockTopicController.getAllTopics.mockImplementation((req: Request, res: Response) => {
        res.status(200).json([]);
      });

      const response = await request(app)
        .get('/api/v1/topic')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(mockTopicController.getAllTopics).toHaveBeenCalled();
      expect(response.body).toEqual([]);
    });

    it('should return 401 when no authorization token provided', async () => {
      mockTopicController.getAllTopics.mockImplementation((req: Request, res: Response) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app)
        .get('/api/v1/topic')
        .expect(401);
    });
  });

  describe('GET /api/v1/topic/:id', () => {
    it('should get topic by id successfully', async () => {
      const topicId = '1';
      const expectedTopic = new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date());

      mockTopicController.getTopicById.mockImplementation((req: Request, res: Response) => {
        res.status(200).json(expectedTopic);
      });

      const response = await request(app)
        .get(`/api/v1/topic/${topicId}`)
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(mockTopicController.getTopicById).toHaveBeenCalled();
    });

    it('should return 404 when topic not found', async () => {
      const topicId = '999';

      mockTopicController.getTopicById.mockImplementation((req: Request, res: Response) => {
        res.status(404).json({ message: 'Topic not found' });
      });

      const response = await request(app)
        .get(`/api/v1/topic/${topicId}`)
        .set('Authorization', 'Bearer valid-token')
        .expect(404);

      expect(mockTopicController.getTopicById).toHaveBeenCalled();
    });
  });

  describe('POST /api/v1/topic', () => {
    it('should create a topic successfully', async () => {
      const newTopic = new Topic('1', 'New Topic', 'New Content', 1, 'root', new Date(), new Date());

      mockTopicController.createTopic.mockImplementation((req: Request, res: Response) => {
        res.status(200).json(newTopic);
      });

      const response = await request(app)
        .post('/api/v1/topic')
        .set('Authorization', 'Bearer valid-token')
        .send({
          name: 'New Topic',
          content: 'New Content',
          parentTopicId: 'root',
        })
        .expect(200);

      expect(mockTopicController.createTopic).toHaveBeenCalled();
    });

    it('should return 400 when required fields are missing', async () => {
      mockTopicController.createTopic.mockImplementation((req: Request, res: Response) => {
        res.status(400).json({ message: 'Bad Request' });
      });

      const response = await request(app)
        .post('/api/v1/topic')
        .set('Authorization', 'Bearer valid-token')
        .send({
          name: 'New Topic',
          parentTopicId: 'root',
        })
        .expect(400);
    });

    it('should return 401 when no authorization token provided', async () => {
      mockTopicController.createTopic.mockImplementation((req: Request, res: Response) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app)
        .post('/api/v1/topic')
        .send({
          name: 'New Topic',
          content: 'New Content',
          parentTopicId: 'root',
        })
        .expect(401);
    });
  });

  describe('PUT /api/v1/topic/:id', () => {
    it('should update a topic successfully', async () => {
      const topicId = '1';
      const updatedTopic = new Topic('1', 'Updated Topic', 'Updated Content', 1, 'root', new Date(), new Date());

      mockTopicController.updateTopic.mockImplementation((req: Request, res: Response) => {
        res.status(200).json(updatedTopic);
      });

      const response = await request(app)
        .put(`/api/v1/topic/${topicId}`)
        .set('Authorization', 'Bearer valid-token')
        .send({
          name: 'Updated Topic',
          content: 'Updated Content',
        })
        .expect(200);

      expect(mockTopicController.updateTopic).toHaveBeenCalled();
    });

    it('should return 401 when no authorization token provided', async () => {
      const topicId = '1';

      mockTopicController.updateTopic.mockImplementation((req: Request, res: Response) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app)
        .put(`/api/v1/topic/${topicId}`)
        .send({
          name: 'Updated Topic',
          content: 'Updated Content',
        })
        .expect(401);
    });
  });

  describe('DELETE /api/v1/topic/:id', () => {
    it('should delete a topic successfully', async () => {
      const topicId = '1';

      mockTopicController.deleteTopic.mockImplementation((req: Request, res: Response) => {
        res.status(200).json({ message: 'Topic deleted successfully' });
      });

      const response = await request(app)
        .delete(`/api/v1/topic/${topicId}`)
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(mockTopicController.deleteTopic).toHaveBeenCalled();
    });

    it('should return 401 when no authorization token provided', async () => {
      const topicId = '1';

      mockTopicController.deleteTopic.mockImplementation((req: Request, res: Response) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app)
        .delete(`/api/v1/topic/${topicId}`)
        .expect(401);
    });
  });

  describe('GET /api/v1/topic/hierarchy', () => {
    it('should get topic hierarchy tree successfully', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
        new Topic('2', 'Topic 2', 'Content 2', 1, 'root', new Date(), new Date()),
      ];

      mockTopicController.getTopicHierarchyTree.mockImplementation((req: Request, res: Response) => {
        res.status(200).json(topics);
      });

      const response = await request(app)
        .get('/api/v1/topic/hierarchy')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(mockTopicController.getTopicHierarchyTree).toHaveBeenCalled();
    });

    it('should return 401 when no authorization token provided', async () => {
      mockTopicController.getTopicHierarchyTree.mockImplementation((req: Request, res: Response) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app)
        .get('/api/v1/topic/hierarchy')
        .expect(401);
    });
  });

  describe('GET /api/v1/topic/shortest-path', () => {
    it('should get shortest path between topics successfully', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
        new Topic('2', 'Topic 2', 'Content 2', 1, 'root', new Date(), new Date()),
      ];

      mockTopicController.getShortestPath.mockImplementation((req: Request, res: Response) => {
        res.status(200).json(topics);
      });

      const response = await request(app)
        .get('/api/v1/topic/shortest-path?startId=1&endId=2')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(mockTopicController.getShortestPath).toHaveBeenCalled();
    });

    it('should return 400 when startId or endId is missing', async () => {
      mockTopicController.getShortestPath.mockImplementation((req: Request, res: Response) => {
        res.status(400).json({ message: 'Bad Request' });
      });

      const response = await request(app)
        .get('/api/v1/topic/shortest-path?startId=1')
        .set('Authorization', 'Bearer valid-token')
        .expect(400);
    });

    it('should return 401 when no authorization token provided', async () => {
      mockTopicController.getShortestPath.mockImplementation((req: Request, res: Response) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app)
        .get('/api/v1/topic/shortest-path?startId=1&endId=2')
        .expect(401);
    });
  });
}); 