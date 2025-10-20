import { type FarcasterService, getFarcasterService } from "./farcaster-service"
import { type LensService, getLensService } from "./lens-service"

export interface SocialProfile {
  id: string
  userId: string
  platform: "farcaster" | "lens" | "twitter" | "discord"
  profileId: string
  username: string
  displayName: string
  avatar?: string
  verified: boolean
  followers: number
  following: number
  bio?: string
  connectedAt: Date
}

export interface ReputationMetrics {
  profileCompleteness: number
  socialFollowers: number
  verificationStatus: number
  activityLevel: number
  trustScore: number
}

export interface VerificationRecord {
  id: string
  userId: string
  type: "email" | "phone" | "social" | "kyc"
  status: "verified" | "pending" | "failed"
  verifiedAt?: Date
  expiresAt?: Date
}

export class SocialIdentityService {
  private farcasterService: FarcasterService
  private lensService: LensService

  constructor() {
    this.farcasterService = getFarcasterService()
    this.lensService = getLensService()
  }

  // Connect social profile
  async connectProfile(userId: string, platform: string, profileId: string): Promise<SocialProfile> {
    try {
      let profile: SocialProfile | null = null

      if (platform === "farcaster") {
        const fcProfile = await this.farcasterService.getUserProfile(profileId)
        if (fcProfile) {
          profile = {
            id: `farcaster-${fcProfile.fid}`,
            userId,
            platform: "farcaster",
            profileId: fcProfile.fid.toString(),
            username: fcProfile.username,
            displayName: fcProfile.displayName,
            avatar: fcProfile.avatar,
            verified: fcProfile.verified,
            followers: fcProfile.followers,
            following: fcProfile.following,
            bio: fcProfile.bio,
            connectedAt: new Date(),
          }
        }
      } else if (platform === "lens") {
        const lensProfile = await this.lensService.getUserProfile(profileId)
        if (lensProfile) {
          profile = {
            id: lensProfile.id,
            userId,
            platform: "lens",
            profileId: lensProfile.id,
            username: lensProfile.handle,
            displayName: lensProfile.name || lensProfile.handle,
            avatar: lensProfile.avatar,
            verified: lensProfile.verified,
            followers: lensProfile.followers,
            following: lensProfile.following,
            bio: lensProfile.bio,
            connectedAt: new Date(),
          }
        }
      }

      if (!profile) {
        throw new Error(`Failed to connect ${platform} profile`)
      }

      return profile
    } catch (error) {
      console.error("[v0] Error connecting social profile:", error)
      throw error
    }
  }
}

// Singleton instance
let socialServiceInstance: SocialIdentityService | null = null

export function getSocialIdentityService(): SocialIdentityService {
  if (!socialServiceInstance) {
    socialServiceInstance = new SocialIdentityService()
  }
  return socialServiceInstance
}
