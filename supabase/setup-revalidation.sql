-- ============================================================
-- ON-DEMAND REVALIDATION SETUP
-- ============================================================
-- Run this ONCE after deploying your site to configure the
-- database webhook to call your revalidation endpoint.
--
-- Replace the values below with your actual deployment URL
-- and the REVALIDATION_SECRET from your .env.local file.
-- ============================================================

-- Set your deployed site URL (no trailing slash)
ALTER DATABASE postgres SET app.settings.site_url = 'https://your-site.vercel.app';

-- Set the same REVALIDATION_SECRET as in your .env.local
ALTER DATABASE postgres SET app.settings.revalidation_secret = 'your-secret-here';

-- ============================================================
-- HOW IT WORKS:
-- 
-- 1. You insert/update/delete data in any content table
-- 2. A Postgres trigger fires notify_cache_invalidation()
-- 3. The function calls YOUR_SITE/api/revalidate via pg_net
-- 4. The API route verifies the secret and busts the cache
-- 5. Next visitor gets fresh data; everyone else still gets
--    the cached version until the rebuild completes
--
-- TABLES WITH TRIGGERS:
-- site_config, nav_links, social_links, projects,
-- project_info, project_links, project_repositories,
-- project_tech_stack, achievements, tech_stack,
-- recommendations, publications, certifications
-- ============================================================
