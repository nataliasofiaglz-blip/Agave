export const exercises = [
    // Bodyweight
    { id: 'bw_pushup', name: 'Lagartijas (Push-ups)', equipment: ['bodyweight'], bodyPart: 'upper', type: 'strength', difficulty: 'beginner' },
    { id: 'bw_squat', name: 'Sentadillas (Squats)', equipment: ['bodyweight'], bodyPart: 'lower', type: 'strength', difficulty: 'beginner' },
    { id: 'bw_lunge', name: 'Desplantes (Lunges)', equipment: ['bodyweight'], bodyPart: 'lower', type: 'strength', difficulty: 'beginner' },
    { id: 'bw_plank', name: 'Plancha (Plank)', equipment: ['bodyweight'], bodyPart: 'core', type: 'endurance', difficulty: 'beginner' },
    { id: 'bw_burpee', name: 'Burpees', equipment: ['bodyweight'], bodyPart: 'full', type: 'cardio', difficulty: 'intermediate' },
    { id: 'bw_pullup', name: 'Dominadas (Pull-ups)', equipment: ['bar'], bodyPart: 'upper', type: 'strength', difficulty: 'advanced' },

    // Dumbbells
    { id: 'db_press', name: 'Press de Hombro con Mancuernas', equipment: ['dumbbell'], bodyPart: 'upper', type: 'strength', difficulty: 'intermediate' },
    { id: 'db_curl', name: 'Curl de Biceps', equipment: ['dumbbell'], bodyPart: 'upper', type: 'hypertrophy', difficulty: 'beginner' },
    { id: 'db_goblet', name: 'Sentadilla Goblet', equipment: ['dumbbell'], bodyPart: 'lower', type: 'strength', difficulty: 'intermediate' },
    { id: 'db_row', name: 'Remo con Mancuerna', equipment: ['dumbbell'], bodyPart: 'upper', type: 'strength', difficulty: 'intermediate' },

    // Barbell
    { id: 'bb_bench', name: 'Press de Banca', equipment: ['barbell', 'bench'], bodyPart: 'upper', type: 'strength', difficulty: 'intermediate' },
    { id: 'bb_squat', name: 'Sentadilla con Barra', equipment: ['barbell', 'rack'], bodyPart: 'lower', type: 'strength', difficulty: 'advanced' },
    { id: 'bb_deadlift', name: 'Peso Muerto', equipment: ['barbell'], bodyPart: 'full', type: 'power', difficulty: 'advanced' },

    // Kettlebell
    { id: 'kb_swing', name: 'Kettlebell Swing', equipment: ['kettlebell'], bodyPart: 'full', type: 'power', difficulty: 'intermediate' },

    // Gym Machines
    { id: 'gym_latpull', name: 'Jalón al Pecho (Lat Pulldown)', equipment: ['cable_machine'], bodyPart: 'upper', type: 'hypertrophy', difficulty: 'beginner' },
    { id: 'gym_legpress', name: 'Prensa de Pierna', equipment: ['leg_press_machine'], bodyPart: 'lower', type: 'strength', difficulty: 'beginner' }
];

export const equipmentList = [
    { id: 'bodyweight', name: 'Peso Corporal' },
    { id: 'dumbbell', name: 'Mancuernas' },
    { id: 'barbell', name: 'Barra Olímpica' },
    { id: 'kettlebell', name: 'Pesa Rusa (Kettlebell)' },
    { id: 'bench', name: 'Banco Plano' },
    { id: 'pullup_bar', name: 'Barra de Dominadas' },
    { id: 'cable_machine', name: 'Poleas' },
    { id: 'leg_press_machine', name: 'Prensa' }
];
