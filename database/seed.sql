-- Seed data for MediCare Plus
-- Execute this after running schema.sql
-- All prices in Indian Rupees (INR)
-- Using real medicine/pharmacy images from online sources

-- Insert sample medicines with real online image URLs
INSERT INTO medicines (name, description, price, category, image_url, in_stock, stock_quantity, requires_prescription) VALUES
-- Pain Relief & Fever
('Paracetamol 500mg', 'Effective pain relief and fever reducer. Fast-acting formula for headaches, muscle pain, and cold symptoms. Works by blocking pain signals in the brain.', 25.00, 'Pain Relief', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', true, 500, false),
('Ibuprofen 400mg', 'Anti-inflammatory medication for pain, fever, and inflammation. Suitable for arthritis, sprains, and menstrual pain. Reduces inflammation and provides relief.', 45.00, 'Pain Relief', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop', true, 300, false),
('Aspirin 75mg', 'Low-dose aspirin for cardiovascular protection and mild pain relief. Daily use under medical supervision. Prevents blood clots.', 32.00, 'Pain Relief', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop', true, 400, false),
('Diclofenac 50mg', 'Strong anti-inflammatory medication for severe pain and inflammation. Effective for joint pain, back pain, and arthritis.', 68.00, 'Pain Relief', 'https://images.unsplash.com/photo-1550572017-4814c6df7e7f?w=400&h=300&fit=crop', true, 250, false),
('Tramadol 50mg', 'Prescription pain reliever for moderate to severe pain. Works on central nervous system. Use only as directed by physician.', 150.00, 'Pain Relief', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop', true, 180, true),

-- Antibiotics
('Amoxicillin 500mg', 'Broad-spectrum antibiotic for bacterial infections including respiratory and urinary tract infections. Penicillin-based medication.', 120.00, 'Antibiotics', 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop', true, 150, true),
('Azithromycin 250mg', 'Macrolide antibiotic effective against respiratory infections, skin infections, and certain STDs. Once-daily dosing.', 185.00, 'Antibiotics', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop', true, 120, true),
('Ciprofloxacin 500mg', 'Fluoroquinolone antibiotic for urinary tract infections, respiratory infections, and gastrointestinal infections.', 95.00, 'Antibiotics', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', true, 200, true),
('Doxycycline 100mg', 'Tetracycline antibiotic for respiratory infections, acne, and skin infections. Broad-spectrum coverage.', 110.00, 'Antibiotics', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop', true, 160, true),

-- Vitamins & Supplements
('Vitamin D3 1000 IU', 'Essential vitamin for bone health, immune function, and mood regulation. Daily supplement for optimal health and calcium absorption.', 75.00, 'Vitamins', 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=300&fit=crop', true, 600, false),
('Omega-3 Fish Oil', 'High-quality fish oil rich in EPA and DHA for heart health, brain function, and joint support. Reduces inflammation.', 350.00, 'Vitamins', 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop', true, 350, false),
('Multivitamin Complex', 'Complete daily multivitamin with essential vitamins and minerals for overall health and wellness. Boosts immunity.', 280.00, 'Vitamins', 'https://images.unsplash.com/photo-1550572017-4814c6df7e7f?w=400&h=300&fit=crop', true, 450, false),
('Vitamin C 1000mg', 'Powerful antioxidant for immune support, skin health, and wound healing. Helps fight infections and boosts immunity.', 85.00, 'Vitamins', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop', true, 500, false),
('Calcium + D3', 'Combination supplement for strong bones and teeth. Essential for bone density and preventing osteoporosis.', 120.00, 'Vitamins', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop', true, 400, false),
('B-Complex', 'Complete B-vitamin formula for energy, metabolism, and nervous system health. Reduces fatigue and stress.', 95.00, 'Vitamins', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop', true, 380, false),

-- Allergy & Cold
('Cetirizine 10mg', 'Fast-acting antihistamine for seasonal allergies, hay fever, and allergic skin reactions. Non-drowsy formula for daily use.', 55.00, 'Allergy', 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop', true, 400, false),
('Loratadine 10mg', '24-hour allergy relief from sneezing, runny nose, and itchy eyes. Once-daily dosage. Non-sedating antihistamine.', 48.00, 'Allergy', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop', true, 380, false),
('Montelukast 10mg', 'Leukotriene receptor antagonist for asthma and allergic rhinitis. Reduces inflammation in airways.', 180.00, 'Allergy', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', true, 220, false),
('Phenylephrine', 'Decongestant for nasal congestion relief. Shrinks blood vessels in nasal passages for easier breathing.', 42.00, 'Allergy', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop', true, 350, false),

-- Digestive Health
('Omeprazole 20mg', 'Proton pump inhibitor for acid reflux, heartburn, and stomach ulcers. Long-lasting relief by reducing stomach acid.', 95.00, 'Digestive', 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=300&fit=crop', true, 250, false),
('Probiotics Daily', 'Advanced probiotic formula with 10 billion CFU for digestive health and immune support. Restores gut flora.', 450.00, 'Digestive', 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop', true, 200, false),
('Ranitidine 150mg', 'H2 blocker for acid reflux and ulcers. Reduces stomach acid production for heartburn relief.', 65.00, 'Digestive', 'https://images.unsplash.com/photo-1550572017-4814c6df7e7f?w=400&h=300&fit=crop', true, 280, false),
('Loperamide', 'Anti-diarrheal medication for quick relief. Slows intestinal movement to reduce diarrhea symptoms.', 38.00, 'Digestive', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop', true, 320, false),
('Pancreatin', 'Digestive enzyme supplement for better digestion. Helps break down proteins, fats, and carbohydrates.', 225.00, 'Digestive', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop', true, 180, false),

-- Diabetes Care
('Metformin 500mg', 'First-line medication for type 2 diabetes management. Helps control blood sugar levels by improving insulin sensitivity.', 65.00, 'Diabetes', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop', true, 180, true),
('Glimepiride 2mg', 'Sulfonylurea for type 2 diabetes. Stimulates pancreas to produce more insulin for better glucose control.', 88.00, 'Diabetes', 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop', true, 150, true),
('Insulin Glargine', 'Long-acting insulin for diabetes management. Provides 24-hour blood sugar control with once-daily dosing.', 890.00, 'Diabetes', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop', true, 80, true),

-- Heart & Blood Pressure
('Amlodipine 5mg', 'Calcium channel blocker for high blood pressure and angina. Once-daily dosage. Relaxes blood vessels.', 125.00, 'Cardiovascular', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', true, 220, true),
('Atorvastatin 10mg', 'Statin medication for cholesterol management and cardiovascular disease prevention. Reduces LDL cholesterol.', 165.00, 'Cardiovascular', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop', true, 200, true),
('Losartan 50mg', 'ARB for high blood pressure. Protects kidneys in diabetic patients. Blocks angiotensin receptors.', 145.00, 'Cardiovascular', 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=300&fit=crop', true, 190, true),
('Metoprolol 50mg', 'Beta-blocker for hypertension, angina, and heart failure. Slows heart rate and reduces blood pressure.', 98.00, 'Cardiovascular', 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop', true, 240, true),
('Clopidogrel 75mg', 'Antiplatelet medication to prevent blood clots. Used after heart attack or stroke prevention.', 210.00, 'Cardiovascular', 'https://images.unsplash.com/photo-1550572017-4814c6df7e7f?w=400&h=300&fit=crop', true, 160, true),

-- Respiratory
('Salbutamol Inhaler', 'Bronchodilator for asthma and COPD. Quick relief of breathing difficulties and wheezing.', 185.00, 'Respiratory', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop', true, 150, false),
('Budesonide Inhaler', 'Corticosteroid inhaler for asthma control. Reduces airway inflammation for long-term management.', 425.00, 'Respiratory', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop', true, 120, true),

-- Skin Care
('Clotrimazole Cream', 'Antifungal cream for ringworm, athlete''s foot, and fungal infections. Topical application for skin.', 68.00, 'Skin Care', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop', true, 300, false),
('Hydrocortisone 1%', 'Topical corticosteroid for skin inflammation, itching, and eczema. Reduces redness and swelling.', 55.00, 'Skin Care', 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop', true, 280, false),

-- Mental Health
('Escitalopram 10mg', 'SSRI antidepressant for depression and anxiety disorders. Improves mood and emotional balance.', 195.00, 'Mental Health', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop', true, 140, true),
('Alprazolam 0.5mg', 'Benzodiazepine for anxiety and panic disorders. Short-term relief of severe anxiety symptoms.', 125.00, 'Mental Health', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', true, 100, true);

-- Note: Using Unsplash medicine/pharmacy images
-- Images are royalty-free and properly formatted (400x300px)
-- If images don't load, Unsplash might have rate limits - use placeholder.svg as fallback
