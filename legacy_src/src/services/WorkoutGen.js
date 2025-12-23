import { exercises } from '../data/exercises.js';

export class WorkoutGenerator {
    constructor() { }

    /**
     * Generate a routine based on criteria
     * @param {Object} criteria 
     * @param {string[]} criteria.equipment - List of available equipment IDs.
     * @param {string} criteria.goal - 'muscle', 'strength', 'endurance', 'definition'.
     * @param {string[]} criteria.focus - ['upper', 'lower', 'core', 'full'].
     * @param {number} criteria.duration - Minutes (15, 30, 45, 60).
     */
    generate(criteria) {
        console.log("Generating workout with:", criteria);

        // 1. Filter by Equipment
        // User must have ALL equipment required for the exercise.
        // Exception: 'bodyweight' is always available.
        const availableExercises = exercises.filter(ex => {
            return ex.equipment.every(req => {
                if (req === 'bodyweight') return true;
                return criteria.equipment.includes(req);
            });
        });

        // 2. Filter by Focus
        // If focus is specifically selected, ignore others.
        // But 'full' includes everything.
        let candidates = [];
        if (criteria.focus.includes('full')) {
            candidates = availableExercises;
        } else {
            candidates = availableExercises.filter(ex =>
                criteria.focus.includes(ex.bodyPart) || ex.bodyPart === 'full'
            );
        }

        // 3. Select Exercises based on Duration
        // Approx 3-4 mins per set incl rest. 
        // 15 min -> 2-3 exercises.
        // 30 min -> 4-5 exercises.
        // 60 min -> 7-8 exercises.
        const targetCount = Math.floor(criteria.duration / 5);

        // Shuffle and Pick
        const routine = this.shuffle(candidates).slice(0, targetCount);

        // Add sets/reps based on goal
        const structuredRoutine = routine.map(ex => {
            let sets = 3;
            let reps = '10-12';
            let rest = '60s';

            if (criteria.goal === 'strength') {
                sets = 5;
                reps = '5';
                rest = '120s';
            } else if (criteria.goal === 'endurance') {
                sets = 3;
                reps = '15-20';
                rest = '30s';
            }

            return {
                ...ex,
                sets,
                reps,
                rest
            };
        });

        return structuredRoutine;
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
}
