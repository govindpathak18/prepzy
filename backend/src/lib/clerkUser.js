// Clerk sends us user data in two different shapes depending on how we get
// it: the Node SDK (clerkClient.users.getUser(), used in protectRoutes.js)
// uses camelCase field names, while raw webhook payloads (event.data in
// inngest.js) use snake_case. These helpers check both, so the same code
// gives the right answer no matter which path a user's data came through.

export const getPrimaryEmail = (clerkUser, fallbackId) =>
  clerkUser.emailAddresses?.[0]?.emailAddress ||
  clerkUser.primaryEmailAddress?.emailAddress ||
  clerkUser.email_addresses?.[0]?.email_address ||
  clerkUser.email ||
  `${fallbackId}@clerk.prepzy.local`;

export const getDisplayName = (clerkUser) =>
  `${clerkUser.firstName || clerkUser.first_name || ""} ${
    clerkUser.lastName || clerkUser.last_name || ""
  }`.trim() ||
  clerkUser.username ||
  clerkUser.externalId ||
  clerkUser.external_id ||
  "Prepzy User";

export const getProfileImage = (clerkUser) =>
  clerkUser.profileImageUrl ||
  clerkUser.imageUrl ||
  clerkUser.image_url ||
  clerkUser.profile_image_url ||
  "";
