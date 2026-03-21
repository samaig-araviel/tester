-- Add postcode column to users table (replacing town/county)
ALTER TABLE users ADD COLUMN IF NOT EXISTS postcode TEXT;

-- Optionally copy existing town data to postcode for any users who had a town set
-- UPDATE users SET postcode = town WHERE town IS NOT NULL AND postcode IS NULL;

-- Update all vendors with banner images (Unsplash free-to-use images)
UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop'
WHERE name = 'Kidly';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop'
WHERE name = 'JoJo Maman Bébé';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=400&fit=crop'
WHERE name = 'Tiny Hearts Education';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop'
WHERE name = 'Kiddyum';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=600&h=400&fit=crop'
WHERE name = 'Happity';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop'
WHERE name = 'My Babiie';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&h=400&fit=crop'
WHERE name = 'Elvie';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&h=400&fit=crop'
WHERE name = 'Koru Kids';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop'
WHERE name = 'Bloom & Wild';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop'
WHERE name = 'Tutorful';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
WHERE name = 'The Mindful Mums Club';

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=400&fit=crop'
WHERE name = 'Natural Baby Shower';

-- Additional vendors
UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop'
WHERE name = 'Little Tikes' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop'
WHERE name = 'BabyBjörn' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1565843248736-8c41e6db117b?w=600&h=400&fit=crop'
WHERE name = 'The White Company' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
WHERE name = 'ClassPass' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop'
WHERE name = 'Mumsnet' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop'
WHERE name = 'Peanut' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=600&h=400&fit=crop'
WHERE name = 'Etta Loves' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&h=400&fit=crop'
WHERE name = 'Mama Mio' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop'
WHERE name = 'Hatch' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&h=400&fit=crop'
WHERE name = 'DadPad' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=600&h=400&fit=crop'
WHERE name = 'KidStart' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop'
WHERE name = 'Explore Learning' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop'
WHERE name = 'Kumon' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1576037728058-60e2bfde5765?w=600&h=400&fit=crop'
WHERE name = 'Tinies' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=600&h=400&fit=crop'
WHERE name = 'Kidsunlimited' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&h=400&fit=crop'
WHERE name = 'Calm' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop'
WHERE name = 'Headspace' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop'
WHERE name = 'HelloFresh' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop'
WHERE name = 'Gousto' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop'
WHERE name = 'Little Dish' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1522661067900-ab829854a57f?w=600&h=400&fit=crop'
WHERE name = 'Bright Horizons' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1564429238961-bf8cf1ce4e28?w=600&h=400&fit=crop'
WHERE name = 'Busy Bees' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop'
WHERE name = 'N Family Club' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600&h=400&fit=crop'
WHERE name = 'Baby Sensory' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&h=400&fit=crop'
WHERE name = 'Gymboree' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop'
WHERE name = 'Monkey Music' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&h=400&fit=crop'
WHERE name = 'Doula UK' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
WHERE name = 'NCT' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop'
WHERE name = 'Home-Start' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=600&h=400&fit=crop'
WHERE name = 'Care.com' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600&h=400&fit=crop'
WHERE name = 'Sitters' AND banner_url IS NULL;

UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop'
WHERE name = 'PodcastOne Parenting' AND banner_url IS NULL;

-- Catch-all: set a generic family image for any remaining vendors without a banner
UPDATE vendors SET banner_url = 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&h=400&fit=crop'
WHERE banner_url IS NULL;
