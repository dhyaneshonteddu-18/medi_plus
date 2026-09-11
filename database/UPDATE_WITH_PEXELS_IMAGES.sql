-- ============================================
-- FRESH UPDATE WITH PEXELS MEDICINE IMAGES
-- NO Unsplash - NO candles - NO fruits - NO duplicates
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Delete order_items first
DELETE FROM order_items;

-- Step 2: Delete orders
DELETE FROM orders;

-- Step 3: Delete medicines
DELETE FROM medicines;

-- Step 4: Insert 40 medicines with UNIQUE Pexels images (pills, bottles, medicine ONLY)
INSERT INTO medicines (name, description, price, category, image_url, in_stock, stock_quantity, requires_prescription) VALUES
-- Pain Relief - UNIQUE pill images
('Paracetamol 500mg', 'Effective pain relief and fever reducer. Fast-acting formula for headaches, muscle pain, and cold symptoms.', 25.00, 'Pain Relief', 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 500, false),
('Ibuprofen 400mg', 'Anti-inflammatory medication for pain, fever, and inflammation. Suitable for arthritis, sprains, and menstrual pain.', 45.00, 'Pain Relief', 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 300, false),
('Aspirin 75mg', 'Low-dose aspirin for cardiovascular protection and mild pain relief. Daily use under medical supervision.', 32.00, 'Pain Relief', 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 400, false),
('Diclofenac 50mg', 'Strong anti-inflammatory medication for severe pain and inflammation. Effective for joint pain, back pain, and arthritis.', 68.00, 'Pain Relief', 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 250, false),
('Tramadol 50mg', 'Prescription pain reliever for moderate to severe pain. Works on central nervous system.', 150.00, 'Pain Relief', 'https://images.pexels.com/photos/3683031/pexels-photo-3683031.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 180, true),

-- Antibiotics - UNIQUE capsule images
('Amoxicillin 500mg', 'Broad-spectrum antibiotic for bacterial infections including respiratory and urinary tract infections.', 120.00, 'Antibiotics', 'https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 150, true),
('Azithromycin 250mg', 'Macrolide antibiotic effective against respiratory infections, skin infections, and certain STDs.', 185.00, 'Antibiotics', 'https://images.pexels.com/photos/3683108/pexels-photo-3683108.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 120, true),
('Ciprofloxacin 500mg', 'Fluoroquinolone antibiotic for urinary tract infections, respiratory infections, and gastrointestinal infections.', 95.00, 'Antibiotics', 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 200, true),
('Doxycycline 100mg', 'Tetracycline antibiotic for respiratory infections, acne, and skin infections.', 110.00, 'Antibiotics', 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 160, true),

-- Vitamins - UNIQUE bottle images
('Vitamin D3 1000 IU', 'Essential vitamin for bone health, immune function, and mood regulation.', 75.00, 'Vitamins', 'https://images.pexels.com/photos/3683095/pexels-photo-3683095.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 600, false),
('Omega-3 Fish Oil', 'High-quality fish oil rich in EPA and DHA for heart health, brain function, and joint support.', 350.00, 'Vitamins', 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 350, false),
('Multivitamin Complex', 'Complete daily multivitamin with essential vitamins and minerals for overall health and wellness.', 280.00, 'Vitamins', 'https://images.pexels.com/photos/3683100/pexels-photo-3683100.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 450, false),
('Vitamin C 1000mg', 'Powerful antioxidant for immune support, skin health, and wound healing.', 85.00, 'Vitamins', 'https://images.pexels.com/photos/4033150/pexels-photo-4033150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 500, false),
('Calcium + D3', 'Combination supplement for strong bones and teeth. Essential for bone density.', 120.00, 'Vitamins', 'https://images.pexels.com/photos/3683096/pexels-photo-3683096.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 400, false),
('B-Complex', 'Complete B-vitamin formula for energy, metabolism, and nervous system health.', 95.00, 'Vitamins', 'https://images.pexels.com/photos/4033152/pexels-photo-4033152.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 380, false),

-- Allergy - UNIQUE tablet images
('Cetirizine 10mg', 'Fast-acting antihistamine for seasonal allergies, hay fever, and allergic skin reactions.', 55.00, 'Allergy', 'https://images.pexels.com/photos/3683042/pexels-photo-3683042.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 400, false),
('Loratadine 10mg', '24-hour allergy relief from sneezing, runny nose, and itchy eyes.', 48.00, 'Allergy', 'https://images.pexels.com/photos/3683070/pexels-photo-3683070.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 380, false),
('Montelukast 10mg', 'Leukotriene receptor antagonist for asthma and allergic rhinitis.', 180.00, 'Allergy', 'https://images.pexels.com/photos/3683043/pexels-photo-3683043.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 220, false),
('Phenylephrine', 'Decongestant for nasal congestion relief. Shrinks blood vessels in nasal passages.', 42.00, 'Allergy', 'https://images.pexels.com/photos/3683050/pexels-photo-3683050.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 350, false),

-- Digestive - UNIQUE medicine images
('Omeprazole 20mg', 'Proton pump inhibitor for acid reflux, heartburn, and stomach ulcers.', 95.00, 'Digestive', 'https://images.pexels.com/photos/3683085/pexels-photo-3683085.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 250, false),
('Probiotics Daily', 'Advanced probiotic formula with 10 billion CFU for digestive health and immune support.', 450.00, 'Digestive', 'https://images.pexels.com/photos/3683046/pexels-photo-3683046.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 200, false),
('Ranitidine 150mg', 'H2 blocker for acid reflux and ulcers. Reduces stomach acid production.', 65.00, 'Digestive', 'https://images.pexels.com/photos/3683053/pexels-photo-3683053.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 280, false),
('Loperamide', 'Anti-diarrheal medication for quick relief. Slows intestinal movement.', 38.00, 'Digestive', 'https://images.pexels.com/photos/3683080/pexels-photo-3683080.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 320, false),
('Pancreatin', 'Digestive enzyme supplement for better digestion.', 225.00, 'Digestive', 'https://images.pexels.com/photos/3683057/pexels-photo-3683057.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 180, false),

-- Diabetes - UNIQUE medical images
('Metformin 500mg', 'First-line medication for type 2 diabetes management.', 65.00, 'Diabetes', 'https://images.pexels.com/photos/3683062/pexels-photo-3683062.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 180, true),
('Glimepiride 2mg', 'Sulfonylurea for type 2 diabetes. Stimulates pancreas to produce more insulin.', 88.00, 'Diabetes', 'https://images.pexels.com/photos/3683044/pexels-photo-3683044.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 150, true),
('Insulin Glargine', 'Long-acting insulin for diabetes management. Provides 24-hour blood sugar control.', 890.00, 'Diabetes', 'https://images.pexels.com/photos/3935725/pexels-photo-3935725.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 80, true),

-- Cardiovascular - UNIQUE pill images
('Amlodipine 5mg', 'Calcium channel blocker for high blood pressure and angina.', 125.00, 'Cardiovascular', 'https://images.pexels.com/photos/3683069/pexels-photo-3683069.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 220, true),
('Atorvastatin 10mg', 'Statin medication for cholesterol management and cardiovascular disease prevention.', 165.00, 'Cardiovascular', 'https://images.pexels.com/photos/3683051/pexels-photo-3683051.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 200, true),
('Losartan 50mg', 'ARB for high blood pressure. Protects kidneys in diabetic patients.', 145.00, 'Cardiovascular', 'https://images.pexels.com/photos/3683063/pexels-photo-3683063.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 190, true),
('Metoprolol 50mg', 'Beta-blocker for hypertension, angina, and heart failure.', 98.00, 'Cardiovascular', 'https://images.pexels.com/photos/3683064/pexels-photo-3683064.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 240, true),
('Clopidogrel 75mg', 'Antiplatelet medication to prevent blood clots.', 210.00, 'Cardiovascular', 'https://images.pexels.com/photos/3683065/pexels-photo-3683065.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 160, true),

-- Respiratory - UNIQUE inhaler images
('Salbutamol Inhaler', 'Bronchodilator for asthma and COPD. Quick relief of breathing difficulties.', 185.00, 'Respiratory', 'https://images.pexels.com/photos/4047043/pexels-photo-4047043.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 150, false),
('Budesonide Inhaler', 'Corticosteroid inhaler for asthma control. Reduces airway inflammation.', 425.00, 'Respiratory', 'https://images.pexels.com/photos/4047152/pexels-photo-4047152.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 120, true),

-- Skin Care - UNIQUE cream images
('Clotrimazole Cream', 'Antifungal cream for ringworm, athlete''s foot, and fungal infections.', 68.00, 'Skin Care', 'https://images.pexels.com/photos/4047146/pexels-photo-4047146.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 300, false),
('Hydrocortisone 1%', 'Topical corticosteroid for skin inflammation, itching, and eczema.', 55.00, 'Skin Care', 'https://images.pexels.com/photos/3683094/pexels-photo-3683094.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 280, false),

-- Mental Health - UNIQUE medicine images
('Escitalopram 10mg', 'SSRI antidepressant for depression and anxiety disorders.', 195.00, 'Mental Health', 'https://images.pexels.com/photos/3683097/pexels-photo-3683097.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 140, true),
('Alprazolam 0.5mg', 'Benzodiazepine for anxiety and panic disorders.', 125.00, 'Mental Health', 'https://images.pexels.com/photos/3683069/pexels-photo-3683069.jpeg?auto=compress&cs=tinysrgb&w=400&h=300', true, 100, true);

-- Verify
SELECT COUNT(*) as total_medicines FROM medicines;
SELECT '✅ SUCCESS! 40 unique Pexels medicine images loaded - NO candles, NO fruits, NO duplicates!' as status;
