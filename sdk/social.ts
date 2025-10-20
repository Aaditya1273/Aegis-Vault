// Social SDK Methods
import type { LuminautClient } from "./client"
import type { SocialProfile } from "./types"

export class SocialSDK {
  constructor(private client: LuminautClient) {}

  async connectProfile(userId: string, platform: string, profileId: string): Promise<SocialProfile> {
    return this.client.request(`/social/connect`, {
      method: "POST",
      body: JSON.stringify({ userId, platform, profileId }),
    })
  }

  async getConnectedProfiles(userId: string): Promise<SocialProfile[]> {
    return this.client.request(`/social/profiles/${userId}`)
  }

  async getReputationScore(userId: string): Promise<number> {
    const response = await this.client.request<{ score: number }>(`/social/reputation/${userId}`)
    return response.score
  }

  async getVerificationStatus(userId: string): Promise<any[]> {
    return this.client.request(`/social/verification/${userId}`)
  }
}
