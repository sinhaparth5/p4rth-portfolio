use wasm_bindgen::prelude::*;
use js_sys::Float32Array;

#[inline]
fn random_range(min: f32, max: f32) -> f32 {
    let random = js_sys::Math::random() as f32;
    min + (random * (max - min))
}

#[wasm_bindgen]
pub struct Scene3D {
    particle_positions: Vec<f32>,
    particle_velocities: Vec<f32>,
    icon_positions: Vec<f32>,
    particle_count: usize,
    spread: f32,
}

#[wasm_bindgen]
impl Scene3D {
    #[wasm_bindgen(constructor)]
    pub fn new(particle_count: usize, spread: f32) -> Self {
        let mut particle_positions = Vec::with_capacity(particle_count * 3);
        let mut particle_velocities = Vec::with_capacity(particle_count * 3);
        
        for _ in 0..particle_count * 3 {
            particle_positions.push(random_range(-spread * 0.5, spread * 0.5));
            particle_velocities.push(random_range(-0.05, 0.05));
        }
        
        Scene3D {
            particle_positions,
            particle_velocities,
            icon_positions: Vec::new(),
            particle_count,
            spread,
        }
    }

    #[wasm_bindgen]
    pub fn update_particles(&mut self, time: f32) -> Float32Array {
        for i in 0..self.particle_count {
            let idx = i * 3;
            
            // Update positions
            for j in 0..3 {
                self.particle_positions[idx + j] += self.particle_velocities[idx + j];
                
                // Boundary check
                if self.particle_positions[idx + j].abs() > self.spread {
                    self.particle_velocities[idx + j] *= -1.0;
                }
            }
            
            // Add time-based movement
            let i_float = i as f32;
            self.particle_positions[idx] += (time * i_float * 0.1).sin() * 0.01;
            self.particle_positions[idx + 1] += (time * i_float * 0.1).cos() * 0.01;
            self.particle_positions[idx + 2] += (time * i_float * 0.05).sin() * 0.005;
        }
        
        Float32Array::from(&self.particle_positions[..])
    }

    #[wasm_bindgen]
    pub fn calculate_icon_positions(&mut self, count: usize) -> Float32Array {
        self.icon_positions = Vec::with_capacity(count * 3);
        
        for i in 0..count {
            let phi = (-1.0 + 2.0 * i as f32 / count as f32).acos();
            let theta = (count as f32 * std::f32::consts::PI).sqrt() * phi;
            
            self.icon_positions.push(self.spread * theta.cos() * phi.sin());
            self.icon_positions.push(self.spread * theta.sin() * phi.sin());
            self.icon_positions.push(self.spread * phi.cos());
        }
        
        Float32Array::from(&self.icon_positions[..])
    }

    #[wasm_bindgen]
    pub fn update_icon_positions(&mut self, time: f32) -> Float32Array {
        let count = self.icon_positions.len() / 3;
        let mut updated_positions = self.icon_positions.clone();
        
        for i in 0..count {
            let idx = i * 3;
            let i_float = i as f32;
            
            updated_positions[idx] += (time + i_float).sin() * (self.spread * 0.03);
            updated_positions[idx + 1] += (time + i_float).cos() * (self.spread * 0.03);
            updated_positions[idx + 2] += (time + i_float).sin() * (self.spread * 0.02);
        }
        
        Float32Array::from(&updated_positions[..])
    }
}