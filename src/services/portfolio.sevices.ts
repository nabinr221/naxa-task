// src/services/portfolio.service.ts
import { httpClient } from "../api";
import type { Project } from "../types";
import { logger } from "../utils/logger";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export class PortfolioService {
  private static readonly PORTFOLIO_ENDPOINT = "/projects";

  /**
   * Get all portfolio projects
   */
  static async getPortfolios(): Promise<Project[]> {
    try {
      const response = await httpClient.get<Project[]>(this.PORTFOLIO_ENDPOINT);
      return response;
    } catch (error) {
      logger.error("Failed to fetch portfolios", error as Error);
      throw new Error("Unable to load portfolios. Please try again later.");
    }
  }

  /**
   * Get featured projects (for Key Highlights category)
   */
  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      const allProjects = await this.getPortfolios();
      const featuredProjects = allProjects.filter(
        (project) => project.is_key_highlight
      );
      return featuredProjects;
    } catch (error) {
      logger.error("Failed to get featured projects", error as Error);
      throw error;
    }
  }

  /**
   * Get projects by category name
   */
  static async getProjectsByCategory(categoryName: string): Promise<Project[]> {
    try {
      const allProjects = await this.getPortfolios();
      const categoryProjects = allProjects.filter((project) =>
        project.category_title?.includes(categoryName)
      );
      return categoryProjects;
    } catch (error) {
      logger.error(
        `Failed to get projects for category: ${categoryName}`,
        error as Error
      );
      throw error;
    }
  }
}
