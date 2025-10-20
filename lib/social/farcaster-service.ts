export interface FarcasterProfile {
  fid: number
  username: string
  displayName: string
  avatar?: string
  bio?: string
  followers: number
  following: number
  verified: boolean
}

export class FarcasterService {
  private apiKey: string

  constructor(apiKey: string = process.env.FARCASTER_API_KEY || "") {
    this.apiKey = apiKey
  }

  // Get user profile
  async getUserProfile(username: string): Promise<FarcasterProfile | null> {
    try {
      const response = await fetch(`https://api.neynar.com/v2/farcaster/user/by_username?username=${username}`, {
        headers: {
          "x-api-key": this.apiKey,
        },
      })

      if (!response.ok) {
        console.error("[v0] Farcaster API error:", response.statusText)
        return null
      }

      const data = await response.json()
      const user = data.user

      return {
        fid: user.fid,
        username: user.username,
        displayName: user.display_name,
        avatar: user.pfp_url,
        bio: user.profile?.bio?.text,
        followers: user.follower_count,
        following: user.following_count,
        verified: user.verified_addresses?.length > 0,
      }
    } catch (error) {
      console.error("[v0] Error fetching Farcaster profile:", error)
      return null
    }
  }

  // Get user casts (posts)
  async getUserCasts(fid: number, limit = 10): Promise<any[]> {
    try {
      const response = await fetch(`https://api.neynar.com/v2/farcaster/feed?fid=${fid}&limit=${limit}`, {
        headers: {
          "x-api-key": this.apiKey,
        },
      })

      if (!response.ok) {
        console.error("[v0] Farcaster API error:", response.statusText)
        return []
      }

      const data = await response.json()
      return data.casts || []
    } catch (error) {
      console.error("[v0] Error fetching Farcaster casts:", error)
      return []
    }
  }
}

export function getFarcasterService(): FarcasterService {
  return new FarcasterService()
}
