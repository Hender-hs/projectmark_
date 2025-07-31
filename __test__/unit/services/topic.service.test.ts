import { TopicService } from '../../../src/domain/topic/service/topic.service';
import { TopicRepository } from '../../../src/domain/topic/repository/topic.abstract.repository';
import { Topic } from '../../../src/domain/topic/model/topic.model';
import { TopicComposite } from '../../../src/domain/topic/model/topic.composite.model';
import { HttpException } from '../../../src/application/exception/http/http.exception';
import { HttpCodes } from '../../../src/application/exception/http/http-codes.exception';

// Mock TopicFactoryModel
jest.mock('../../../src/domain/topic/model/topic.factory.model', () => ({
  TopicFactoryModel: jest.fn().mockImplementation((topic) => ({
    increaseVersion: jest.fn().mockReturnThis(),
    save: jest.fn().mockResolvedValue(topic),
  })),
}));

const mockTopicRepository = {
  getAllTopics: jest.fn(),
  getTopicById: jest.fn(),
  createTopic: jest.fn(),
  updateTopic: jest.fn(),
  deleteTopic: jest.fn(),
} as jest.Mocked<TopicRepository>;

describe('TopicService', () => {
  let topicService: TopicService;

  beforeEach(() => {
    topicService = new TopicService(mockTopicRepository);
    jest.clearAllMocks();
  });

  describe('getAllTopics', () => {
    it('should return all topics', async () => {
      const expectedTopics = [
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
        new Topic('2', 'Topic 2', 'Content 2', 1, 'root', new Date(), new Date()),
      ];

      mockTopicRepository.getAllTopics.mockResolvedValue(expectedTopics);

      const result = await topicService.getAllTopics();

      expect(mockTopicRepository.getAllTopics).toHaveBeenCalled();
      expect(result).toEqual(expectedTopics);
    });

    it('should return empty array when no topics exist', async () => {
      mockTopicRepository.getAllTopics.mockResolvedValue([]);

      const result = await topicService.getAllTopics();

      expect(mockTopicRepository.getAllTopics).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getTopicById', () => {
    it('should return topic by id', async () => {
      const topicId = '1';
      const expectedTopic = new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date());

      mockTopicRepository.getTopicById.mockResolvedValue(expectedTopic);

      const result = await topicService.getTopicById(topicId);

      expect(mockTopicRepository.getTopicById).toHaveBeenCalledWith(topicId, NaN);
      expect(result).toEqual(expectedTopic);
    });

    it('should return topic by id with specific version', async () => {
      const topicId = '1';
      const version = 2;
      const expectedTopic = new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date());

      mockTopicRepository.getTopicById.mockResolvedValue(expectedTopic);

      const result = await topicService.getTopicById(topicId, version);

      expect(mockTopicRepository.getTopicById).toHaveBeenCalledWith(topicId, version);
      expect(result).toEqual(expectedTopic);
    });

    it('should throw error when topic not found', async () => {
      const topicId = '999';

      mockTopicRepository.getTopicById.mockResolvedValue(undefined);

      await expect(topicService.getTopicById(topicId)).rejects.toThrow(
        new HttpException(HttpCodes.NOT_FOUND, 'Topic not found')
      );
      expect(mockTopicRepository.getTopicById).toHaveBeenCalledWith(topicId, NaN);
    });
  });

  describe('createTopic', () => {
    it('should create a topic successfully', async () => {
      const newTopic = new Topic('1', 'New Topic', 'New Content', 1, 'root', new Date(), new Date());
      const { TopicFactoryModel } = require('../../../src/domain/topic/model/topic.factory.model');

      const result = await topicService.createTopic(newTopic);

      expect(TopicFactoryModel).toHaveBeenCalledWith(newTopic);
      expect(result).toEqual(newTopic);
    });
  });

  describe('updateTopic', () => {
    it('should update a topic successfully', async () => {
      const topicId = '1';
      const updatedTopic = new Topic('1', 'Updated Topic', 'Updated Content', 1, 'root', new Date(), new Date());
      const { TopicFactoryModel } = require('../../../src/domain/topic/model/topic.factory.model');

      const result = await topicService.updateTopic(topicId, updatedTopic);

      expect(TopicFactoryModel).toHaveBeenCalledWith({ ...updatedTopic, id: topicId });
      expect(result).toEqual({ ...updatedTopic, id: topicId });
    });
  });

  describe('deleteTopic', () => {
    it('should delete a topic successfully', async () => {
      const topicId = '1';

      mockTopicRepository.deleteTopic.mockResolvedValue(undefined);

      const result = await topicService.deleteTopic(topicId);

      expect(mockTopicRepository.deleteTopic).toHaveBeenCalledWith(topicId);
      expect(result).toBeUndefined();
    });
  });

  describe('getTopicHierarchyTree', () => {
    it('should return topic hierarchy tree', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
        new Topic('2', 'Topic 2', 'Content 2', 1, 'root', new Date(), new Date()),
        new Topic('3', 'Topic 3', 'Content 3', 1, '1', new Date(), new Date()),
      ];

      mockTopicRepository.getAllTopics.mockResolvedValue(topics);

      const result = await topicService.getTopicHierarchyTree('root');

      expect(mockTopicRepository.getAllTopics).toHaveBeenCalled();
      expect(result).toBeInstanceOf(TopicComposite);
      expect(result).toBeDefined();
    });

    it('should return topic hierarchy tree for specific id', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
        new Topic('2', 'Topic 2', 'Content 2', 1, 'root', new Date(), new Date()),
      ];

      mockTopicRepository.getAllTopics.mockResolvedValue(topics);

      const result = await topicService.getTopicHierarchyTree('1');

      expect(mockTopicRepository.getAllTopics).toHaveBeenCalled();
      expect(result).toBeInstanceOf(TopicComposite);
      expect(result).toBeDefined();
    });
  });

  describe('getJsonTopicHierarchyTree', () => {
    it('should return JSON string of topic hierarchy tree', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
      ];

      mockTopicRepository.getAllTopics.mockResolvedValue(topics);

      const result = await topicService.getJsonTopicHierarchyTree('root');

      expect(mockTopicRepository.getAllTopics).toHaveBeenCalled();
      expect(typeof result).toBe('string');
      expect(JSON.parse(result)).toBeDefined();
    });
  });

  describe('getShortestPath', () => {
    it('should return shortest path between two topics', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
        new Topic('2', 'Topic 2', 'Content 2', 1, 'root', new Date(), new Date()),
        new Topic('3', 'Topic 3', 'Content 3', 1, '1', new Date(), new Date()),
      ];

      mockTopicRepository.getAllTopics.mockResolvedValue(topics);

      const result = await topicService.getShortestPath('1', '2');

      expect(mockTopicRepository.getAllTopics).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should throw error when start topic not found', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
      ];

      mockTopicRepository.getAllTopics.mockResolvedValue(topics);

      await expect(topicService.getShortestPath('999', '1')).rejects.toThrow(
        new HttpException(HttpCodes.NOT_FOUND, 'Start topic not found')
      );
    });

    it('should throw error when target topic not found', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
      ];

      mockTopicRepository.getAllTopics.mockResolvedValue(topics);

      await expect(topicService.getShortestPath('1', '999')).rejects.toThrow(
        new HttpException(HttpCodes.NOT_FOUND, 'Target topic not found')
      );
    });

    it('should return path from root to child', async () => {
      const topics = [
        new Topic('root', 'Root', 'Root content', 1, '', new Date(), new Date()),
        new Topic('1', 'Topic 1', 'Content 1', 1, 'root', new Date(), new Date()),
        new Topic('2', 'Topic 2', 'Content 2', 1, '1', new Date(), new Date()),
      ];

      mockTopicRepository.getAllTopics.mockResolvedValue(topics);

      const result = await topicService.getShortestPath('root', '2');

      expect(result.length).toBe(3);
      expect(result[0].id).toBe('root');
      expect(result[1].id).toBe('1');
      expect(result[2].id).toBe('2');
    });
  });
}); 