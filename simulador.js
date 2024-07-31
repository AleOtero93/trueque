const _ = require('lodash');

// Configuración de Edificios, Situaciones y Artefactos
const edificios = [
    { nombre: 'Mina', era: 1, costo: { MET: 2, MAD: 1 }, recurso: 'MET', poblador: false },
    { nombre: 'Aserradero', era: 1, costo: { MET: 1, MAD: 2 }, recurso: 'MAD', poblador: false },
    { nombre: 'Corral', era: 1, costo: { MAD: 1, GAN: 2 }, recurso: 'GAN', poblador: false },
    { nombre: 'Molino', era: 1, costo: { MET: 1, MAD: 2 }, recurso: 'GRA', poblador: false },
    { nombre: 'Mercado', era: 1, costo: { MET: 2, MAD: 2, GAN: 1, GRA: 1 }, recurso: 'PC', poblador: false },
    { nombre: 'Taller', era: 2, costo: { MET: 3, MAD: 2 }, recurso: 'H', poblador: false },
    { nombre: 'Tenería', era: 2, costo: { MAD: 2, GAN: 2 }, recurso: 'C', poblador: false },
    { nombre: 'Prensa', era: 2, costo: { MAD: 3, GRA: 1 }, recurso: 'A', poblador: false },
    { nombre: 'Biblioteca', era: 2, costo: { MET: 1, MAD: 1, GAN: 1, GRA: 1 }, recurso: 'CN', poblador: false }
];

const situacionesEra1 = [
    {
        nombre: 'Hambruna',
        era: 1,
        requerimientos: { GAN: 2, GRA: 2 },
        recompensas: { PV: 1, POB: 1, GRA_PROD: 1 },
        penalizaciones: { GAN: -1, GRA_PROD: -1 },
    },
    {
        nombre: 'Hambruna',
        era: 1,
        requerimientos: { GAN: 2, GRA: 2 },
        recompensas: { PV: 1, POB: 1, GRA_PROD: 1 },
        penalizaciones: { GAN: -1, GRA_PROD: -1 },
    },
    // ... Añadir más situaciones aquí ...
];
const situacionesEra2 = [
    {
        nombre: 'Hambruna',
        era: 1,
        requerimientos: { GAN: 2, GRA: 2 },
        recompensas: { PV: 1, POB: 1, GRA_PROD: 1 },
        penalizaciones: { GAN: -1, GRA_PROD: -1 },
    },
    {
        nombre: 'Hambruna',
        era: 1,
        requerimientos: { GAN: 2, GRA: 2 },
        recompensas: { PV: 1, POB: 1, GRA_PROD: 1 },
        penalizaciones: { GAN: -1, GRA_PROD: -1 },
    },
    // ... Añadir más situaciones aquí ...
];

const artefactos = [
    { nombre: 'Armadura Acolchada', costo: { GAN: 4, C: 1, PC: 2 }, PV: 1 },
    { nombre: 'Prensa', costo: { MAD: 4, CN: 1, PC: 2 }, PV: 1 },
    { nombre: 'Vasijas', costo: { MET: 4, H: 1, PC: 2 }, PV: 1 },
    { nombre: 'Cerveza', costo: { GRA: 4, A: 1, PC: 2 }, PV: 1 },
    { nombre: 'Sierra Larga', costo: { MET: 3, MAD: 2, H: 1, PC: 3 }, PV: 2 },
    { nombre: 'Rotación de Cultivo', costo: { GRA: 5, CN: 2, PC: 3 }, PV: 2 },
    { nombre: 'Alfombra', costo: { GAN: 5, C: 2, PC: 3 }, PV: 2 },
    { nombre: 'Puntas de Lanza', costo: { MET: 3, H: 1, CN: 1, PC: 3 }, PV: 2 },
    { nombre: 'Casco Recubierto', costo: { MAD: 4, H: 2, PC: 3 }, PV: 2 },
    { nombre: 'Casas Recubiertas', costo: { GAN: 3, H: 1, C: 2, PC: 3 }, PV: 2 },
    { nombre: 'Cacao', costo: { GRA: 5, A: 1, CN: 1, PC: 4 }, PV: 3 },
    { nombre: 'Alimento Refinado', costo: { GRA: 4, GAN: 2, A: 1, CN: 1, PC: 4 }, PV: 3 },
    { nombre: 'Transporte en Rieles', costo: { MET: 1, MAD: 5, H: 2, PC: 4 }, PV: 3 },
    { nombre: 'Armamento', costo: { MET: 3, MAD: 3, H: 2, PC: 4 }, PV: 3 },
    { nombre: 'Pieles', costo: { GAN: 3, C: 2, A: 2, PC: 4 }, PV: 3 },
    { nombre: 'Armadura Pesada', costo: { MET: 5, C: 1, H: 1, PC: 4 }, PV: 3 }
];

// Inicializa los jugadores y sus poblados
let pobladoNeutral;
function initGame(numPlayers) {
    const cantidadRecursosPobladoNeutral = numPlayers - 1;
    pobladoNeutral = { MET: cantidadRecursosPobladoNeutral, MAD: cantidadRecursosPobladoNeutral, GAN: cantidadRecursosPobladoNeutral, GRA: cantidadRecursosPobladoNeutral }
    const players = [];
    const poblados = ['Minero', 'Maderero', 'Ganadero', 'Agrícola', 'Nutritivo', 'Industrial'];
    const pobladoConfigs = {
        Minero: { MET: 6, MAD: 0, GAN: 0, GRA: 0 },
        Maderero: { MET: 0, MAD: 6, GAN: 0, GRA: 0 },
        Ganadero: { MET: 0, MAD: 0, GAN: 6, GRA: 0 },
        Agrícola: { MET: 0, MAD: 0, GAN: 0, GRA: 6 },
        Nutritivo: { MET: 0, MAD: 3, GAN: 0, GRA: 3 },
        Industrial: { MET: 3, MAD: 0, GAN: 3, GRA: 0 }
    };

    _.shuffle(poblados).slice(0, numPlayers).forEach((poblado, index) => {
        // Hacer los recursos extra aca random
        players.push({
            id: index + 1,
            poblado,
            recursos: { ...pobladoConfigs[poblado] },
            produccion: pobladoConfigs,
            produccionTemporal: {},
            pc: 1,
            casas: 1,
            pobladores: 1,
            edificios: [],
            artefactos: [],
            pv: 0
        });
    });

    return players;
}

// Generar recursos para cada jugador
function generarRecursos(players) {
    players.forEach(player => {
        player.recursos.MET += player.produccion.MET + player.produccionTemporal.MET;
        player.recursos.MAD += player.produccion.MAD + player.produccionTemporal.MAD;
        player.recursos.GAN += player.produccion.GAN + player.produccionTemporal.GAN;
        player.recursos.GRA += player.produccion.GRA + player.produccionTemporal.GRA;
        player.produccionTemporal = {};
    });

    // Recursos adicionales por edificios
    let edificiosConPobladores = 0;
    player.edificios.forEach(edificio => {
        player.recursos[edificio.recurso] += edificio.poblador ? 2 : 1;
        if (edificio.poblador) {
            edificiosConPobladores++;
        }
    });

    // Ajuste de recursos por pobladores y casas
    const extraRecursos = Math.floor((player.pobladores - edificiosConPobladores) / 2);
    let extra = Math.random(0, extraRecursos);
    extraRecursos -= extra;
    player.recursos.MET += player.edificios.some(e => e.recurso === 'MET') ? extra : 0;
    extra = Math.random(0, extraRecursos);
    extraRecursos -= extra;
    player.recursos.MAD += player.edificios.some(e => e.recurso === 'MAD') ? extra : 0;
    extra = Math.random(0, extraRecursos);
    extraRecursos -= extra;
    player.recursos.GAN += player.edificios.some(e => e.recurso === 'GAN') ? extra : 0;
    extra = extraRecursos;
    extraRecursos -= extra;
    player.recursos.GRA += player.edificios.some(e => e.recurso === 'GRA') ? extra : 0;

    // Descontar manutención por pobladores
};

// Resolución de situaciones
function resolverSituacion(players, situacion) {
    players.forEach(player => {
        const cumple = Object.entries(situacion.requerimientos).every(([recurso, cantidad]) => player.recursos[recurso] >= cantidad);
        // Por ahora todos quieren resolver
        // const quiere = Math.random(0, 10) >= 4 ? true : false
        
        // if (cumple && quiere) {
        if (cumple) {
            // Restar recursos requeridos
            Object.entries(situacion.requerimientos).forEach(([recurso, cantidad]) => {
                player.recursos[recurso] -= cantidad;
            });
            // Aplicar recompensas
            Object.entries(situacion.recompensas).forEach(([recurso, cantidad]) => {
                if (recurso === "POB") {
                    if (player.pobladores < (player.casas * 4)) {
                        player.pobladores++;
                    } else {
                        const recursoComida = _.some(["GAN", "GRA"]);
                        player.recursos[recursoComida]++;
                    }
                } else if (recurso.includes("_PROD")) {
                    recurso = recurso.substring(0,3);
                    player.produccionTemporal[recurso] = cantidad;
                } else {
                    player.recursos[recurso] += cantidad;
                }
            });
            player.pv += situacion.recompensas.PV || 0;
        } else {
            // Aplicar penalizaciones
            Object.entries(situacion.penalizaciones).forEach(([recurso, cantidad]) => {
                if (recurso === "POB") {
                    if (player.pobladores >= cantidad) {
                        player.pobladores -= cantidad;
                    } else {
                        player.pv--;
                    }
                } else if (recurso.includes("_PROD")) {
                    recurso = recurso.substring(0,3);
                    player.produccionTemporal[recurso] = cantidad;
                } else {
                    player.recursos[recurso] -= cantidad;
                }
            });
            player.pv += situacion.penalizaciones.PV || 0;
        }
    });
}

// Simular fase de comercio entre jugadores
function comercioEntreJugadores(players) {
    // Simulación básica: intercambios aleatorios de recursos
    const trades = [
        { from: 1, to: 3, give: 'MET', receive: 'GAN', amount: 2 },
        { from: 2, to: 3, give: 'MAD', receive: 'GAN', amount: 2 }
    ];

    trades.forEach(trade => {
        const fromPlayer = players.find(p => p.id === trade.from);
        const toPlayer = players.find(p => p.id === trade.to);

        if (fromPlayer.recursos[trade.give] >= trade.amount && toPlayer.recursos[trade.receive] >= trade.amount) {
            fromPlayer.recursos[trade.give] -= trade.amount;
            fromPlayer.recursos[trade.receive] += trade.amount;

            toPlayer.recursos[trade.receive] -= trade.amount;
            toPlayer.recursos[trade.give] += trade.amount;

            fromPlayer.pc += 1;
            toPlayer.pc += 1;
        }
    });
}

// Simular fase de comercio con poblado neutral
function comercioConPobladoNeutral(players) {
    // Simulación básica: cada jugador puede comerciar si tiene suficientes recursos y PC
    players.forEach(player => {
        if (faltanteSituacion(player, situacion)) {
            
        }
    });
}

// Calcula si el jugador necesita recursos para la situación
function faltanteSituacion(player, situacion) {
    let cantidadFaltante = 0;
    let recursosFaltantes, recursosRestantes = {};
    Object.entries(situacion.requerimientos).forEach(([recurso, cantidad]) => {
        if (player.recursos[recurso] < cantidad) {
            cantidadFaltante += (cantidad - player.recursos[recurso]);
            recursosFaltantes[recurso] = cantidad;
        } else {
            recursosRestantes[recurso] -= cantidad;
        }
    });
    if (cantidadFaltante < 3 && cantidadFaltante > 0) {
        switch(cantidadFaltante) {
            case 1:
                if (pobladoNeutralTiene(recursosFaltantes) && player.pc > 0 && leAlcanza(player, recursosRestantes, 1)) {
                    return true;
                }
                break;
            case 2:
                if (pobladoNeutralTiene(recursosFaltantes) && player.pc > 1 && leAlcanza(player, recursosRestantes, 2)) {
                    return true;
                }
                break;
        }
    } else {
        return false;
    }
}

// Calcula si le alcanza al jugador los recursos para hacer el trueque con el poblado neutral y pasar la situación
function leAlcanza(player, recursos, faltantes) {
    if(player.edificios.includes('Mercado')) {
        if(recursos.sum() >= faltantes) {
            return true
        }
    } else {
        if(recursos.sum() > faltantes) {
            return true
        }
    }
    return false;
}

// Chequea si el poblado neutral tiene los recursos que necesita el jugador
function pobladoNeutralTiene(recursos) {
    pobladoNeutral.forEach((recurso, cantidad) => {
        if(recursos[recurso] > cantidad) {
            return false;
        }
    })

    return true;
}

// Simulación de una ronda del juego
function simularRonda(players, situaciones, era) {
    console.log('\n--- Nueva Ronda ---');
    generarRecursos(players);
    console.log('\nRecursos Generados:');
    console.table(players.map(p => ({ id: p.id, ...p.recursos })));

    const situacion = _.sample(situaciones);
    console.log('\nSituación:', situacion.nombre);

    //comercioEntreJugadores(players);
    //console.log('\nDespués de Comercio Entre Jugadores:');
    //console.table(players.map(p => ({ id: p.id, ...p.recursos, pc: p.pc })));

    //comercioConPobladoNeutral(players);
    //console.log('\nDespués de Comercio con Poblado Neutral:');
    //console.table(players.map(p => ({ id: p.id, ...p.recursos, pc: p.pc })));

    resolverSituacion(players, situacion);
    console.log('\nDespués de Resolver Situación:');
    console.table(players.map(p => ({ id: p.id, ...p.recursos, pv: p.pv })));

    if (era === 1) {
        for(i = 0; i < 2; i++) {
            players.forEach(jugador => {
                hacerAccion(jugador, era);
            });
        }
    } else {
        for(i = 0; i < 3; i++) {
            players.forEach(jugador => {
                hacerAccion(jugador, era);
            });
        }
    }
    console.log('\Después de hacer las acciones:');
    console.table(players.map(p => ({ id: p.id, ...p.recursos, pv: p.pv })));
}

// Simula acciones para cada jugador
function hacerAccion(jugador, era) {

}

// Inicializar el juego y simular las 8 rondas
// Ver orden de arranque
const players = initGame(3);
for(i = 0; i < 4; i++) {
    simularRonda(players, situacionesEra1, 1);
}
for(i = 0; i < 4; i++) {
    simularRonda(players, situacionesEra2, 2);
}

console.log('\n--- Estado Final de Jugadores ---');
console.table(players.map(p => ({ id: p.id, ...p.recursos, pv: p.pv })));
