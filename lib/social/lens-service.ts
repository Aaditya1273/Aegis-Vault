export interface LensProfile {
  id: string
  handle: string
  name?: string
  bio?: string
  avatar?: string
  followers: number
  following: number
  verified: boolean
}

export class LensService {
  private apiEndpoint = "https://api-mumbai.lens.dev"

  // Get user profile
  async getUserProfile(handle: string): Promise<LensProfile | null> {
    try {
      const query = `
        query {
          profiles(request: { handles: ["${handle}"] }) {
            items {
              id
              handle
              name
              bio
              picture {
                ... on MediaSet {
                  original {
                    url
                  }
                }
              }
              stats {
                totalFollowers
                totalFollowing
              }
              isFollowedByMe
            }
          }
        }
      `

      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      const profile = data.data?.profiles?.items?.[0]

      if (!profile) return null

      return {
        id: profile.id,
        handle: profile.handle,
        name: profile.name,
        bio: profile.bio,
        avatar: profile.picture?.original?.url,
        followers: profile.stats?.totalFollowers || 0,
        following: profile.stats?.totalFollowing || 0,
        verified: !!profile.isFollowedByMe,
      }
    } catch (error) {
      console.error("[v0] Error fetching Lens profile:", error)
      return null
    }
  }

  // Get user publications
  async getUserPublications(profileId: string, limit = 10): Promise<any[]> {
    try {
      const query = `
        query {
          publications(request: { profileId: "${profileId}", limit: ${limit} }) {
            items {
              id
              metadata {
                content
              }
              stats {
                totalAmountOfComments
                totalAmountOfMirrors
                totalUpvotes
              }
              createdAt
            }
          }
        }
      `

      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      return data.data?.publications?.items || []
    } catch (error) {
      console.error("[v0] Error fetching Lens publications:", error)
      return []
    }
  }
}

export function getLensService(): LensService {
  return new LensService()
}
