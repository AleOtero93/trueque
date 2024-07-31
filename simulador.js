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
        penalizaciones: { GAN: 1, GRA_PROD: -1 },
    },
    {
        nombre: 'Hambruna',
        era: 1,
        requerimientos: { GAN: 2, GRA: 2 },
        recompensas: { PV: 1, POB: 1, GRA_PROD: 1 },
        penalizaciones: { GAN: 1, GRA_PROD: -1 },
    },
    {
        nombre: 'Incendio',
        era: 1,
        requerimientos: { MET: 2, GRA: 3 },
        recompensas: { PV: 1, MET: 1, MAD_PROD: 1 },
        penalizaciones: { MAD: 1, MAD_PROD: -1 },
    },
    {
        nombre: 'Incendio',
        era: 1,
        requerimientos: { MET: 2, GRA: 3 },
        recompensas: { PV: 1, MET: 1, MAD_PROD: 1 },
        penalizaciones: { MAD: 1, MAD_PROD: -1 },
    },
    {
        nombre: 'Guerra',
        era: 1,
        requerimientos: { MET: 3, GAN: 2 },
        recompensas: { PV: 1, REC: 2 },
        penalizaciones: { POB: 2 },
    },
    {
        nombre: 'Saqueos Nómadas',
        era: 1,
        requerimientos: { MET: 1, MAD: 1, GAN: 3, GRA: 1 },
        recompensas: { PV: 2, GAN: 1 },
        penalizaciones: { PV: 1, GRA: 1, GAN_PROD: -1 },
    },
    {
        nombre: 'Saqueos Nómadas',
        era: 1,
        requerimientos: { MET: 1, MAD: 1, GAN: 3, GRA: 1 },
        recompensas: { PV: 2, GAN: 1 },
        penalizaciones: { PV: 1, GRA: 1, GAN_PROD: -1 },
    },
    {
        nombre: 'Crecimiento',
        era: 1,
        requerimientos: { MET: 1, MAD: 2, GAN: 2, GRA: 2 },
        recompensas: { PV: 2, REC: 3, POB: 1 },
        penalizaciones: {},
    },
    {
        nombre: 'Terremoto',
        era: 1,
        requerimientos: { MET: 2, MAD: 2, GAN: 2, GRA: 1 },
        recompensas: { PV: 2, MAD: 2, MET_PROD: 1 },
        penalizaciones: { PV: 1, MAD: 2, MET_PROD: -1 },
    }
    // ... Añadir más situaciones aquí ...
];
const situacionesEra2 = [
    {
        nombre: 'Sequía',
        era: 2,
        requerimientos: { GAN: 2, GRA: 4 },
        recompensas: { PV: 1, MAD: 2, GRA_PROD: 1 },
        penalizaciones: { PV: 1, POB: 1, "GRA/GAN": 2 },
    },
    {
        nombre: 'Sequía',
        era: 2,
        requerimientos: { GAN: 2, GRA: 4 },
        recompensas: { PV: 1, MAD: 2, GRA_PROD: 1 },
        penalizaciones: { PV: 1, POB: 1, "GRA/GAN": 2 },
    },
    {
        nombre: 'Terremoto',
        era: 2,
        requerimientos: { MET: 2, MAD: 2, GAN: 2, GRA: 1 },
        recompensas: { PV: 2, MAD: 2, MET_PROD: 1 },
        penalizaciones: { PV: 1, MAD: 2, MET_PROD: -1 },
    },
    {
        nombre: 'Terremoto',
        era: 2,
        requerimientos: { MET: 2, MAD: 2, GAN: 2, GRA: 1 },
        recompensas: { PV: 2, MAD: 2, MET_PROD: 1 },
        penalizaciones: { PV: 1, MAD: 2, MET_PROD: -1 },
    },
    {
        nombre: 'Prosperidad',
        era: 2,
        requerimientos: { MET: 3, GAN: 2, GRA: 2 },
        recompensas: { PV: 2, POB: 2, REC: 4 },
        penalizaciones: { PV: 1 },
    },
    {
        nombre: 'Inundación',
        era: 2,
        requerimientos: { MET: 2, MAD: 3, GAN: 3 },
        recompensas: { PV: 3, "MET/MAD": 2, "GRA/GAN": 2 },
        penalizaciones: { MAD: 2, GRA_PROD: -1, GAN_PROD: -1 },
    },
    {
        nombre: 'Inundación',
        era: 2,
        requerimientos: { MET: 2, MAD: 3, GAN: 3 },
        recompensas: { PV: 3, "MET/MAD": 2, "GRA/GAN": 2 },
        penalizaciones: { MAD: 2, GRA_PROD: -1, GAN_PROD: -1 },
    },
    {
        nombre: 'Gran Guerra',
        era: 2,
        requerimientos: { MET: 4, MAD: 4 },
        recompensas: { PV: 3, MET: 3, GRA_PROD: 3 },
        penalizaciones: { POB: 4, CASA: 1 },
    },
    {
        nombre: 'Gran Proyecto',
        era: 2,
        requerimientos: { MET: 3, MAD: 3, GAN: 2, GRA: 2 },
        recompensas: { PV: 4, REC: 4 },
        penalizaciones: { PV: 2, REC: 2, REC_PROD: -2 },
    }
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

        // Hacer los recursos extra aca random
        for (let i = 0; i < 2; i++) {
            switch(Math.random(0, 3)) {
                case 0:
                    players[index].recursos.MET += 1
                    break;
                case 1:
                    players[index].recursos.MAD += 1
                    break;
                case 2:
                    players[index].recursos.GAN += 1
                    break;
                case 3:
                    players[index].recursos.GRA += 1
                    break;
            }
        }
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
    const totalPobladores = player.pobladores + edificiosConPobladores
    const manutencion = Math.floor(totalPobladores / 4);
    while(manutencion > 0) {
        if(Math.random(0, 1) === 0) {
            if(player.recursos.GRA > 0) {
                player.recursos.GRA--;
                manutencion--;
            } else if(player.recursos.GAN > 0) {
                player.recursos.GAN-
                manutencion--;
            } else {
                break;
            }
        } else {
            if(player.recursos.GAN > 0) {
                player.recursos.GAN--;
                manutencion--;
            } else if(player.recursos.GRA > 0) {
                player.recursos.GRA--;
                manutencion--;
            } else {
                break;
            }
        }
    }
    const descuentoPobladores = 2 * manutencion;
    if (player.pobladores > descuentoPobladores) {
        player.pobladores -= descuentoPobladores;
    } else {
        player.pobladores = 0;
    }
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

// Simula acciones para cada jugador
let edificiosComprados = [];
function hacerAccion(jugador, era) {
    if (era === 1) {
        // Puede comprar edificio, casa, llamar poblador/es o pasar
        const madera = jugador.recursos.MAD;
        const comida = jugador.recursos.GRA + jugador.recursos.GAN;
        const valorAleatorio = Math.random(0,10);
        if (valorAleatorio === 0) {
            // Pasa
            return jugador;
        }
        if (madera === 0) {
            // No hay madera
            if (comida === 0) {
                // No hay comida
                return jugador;
            }
            // Llama pobladores
            if (comida > 2 && ((jugador.casas * 4) - 2) >= jugador.pobladores) {
                jugador.pobladores += 2;
                restarComida(jugador, 2);
            } else if (((jugador.casas * 4) - 1) >= jugador.pobladores) {
                jugador.poladores++;
                restarComida(jugador, 1);
            }
            return jugador;
        } else {
            if (valorAleatorio < 3) {
                // Compra casa
                jugador.recursos.MAD--;
                jugador.casas++;
                return jugador;
            } else {
                // Prioriza casa si no tiene más lugar para pobladores, sino edificio
                if (jugador.casas * 4 <= jugador.pobladores) {
                    jugador.recursos.MAD--;
                    jugador.casas++;
                    return jugador;
                } else {
                    // Edificio (si puede)
                    if (jugador.recursos.MET > 0 || jugador.recursos.GAN > 1) {
                        const edificioDeseado = Math.random(0, 4);
                        let construyo = false;
                        let vueltaEntera = 0;
                        while(!construyo && vueltaEntera < 5) {
                            switch(edificioDeseado) {
                                case 0:
                                    // Mina
                                    if (jugador.recursos.MAD >= 1 && jugador.recursos.MET >= 2) {
                                        if (edificiosComprados.filter(edificio => {
                                            if (edificio === "Mina" || edificio === "Aserradero") {
                                                return true;
                                            }
                                        }).count < (players.count - 1)) {
                                            edificiosComprados.push("Mina");
                                            if (jugador.pobladores > 0) {
                                                edificios[0].poblador = true;
                                            } else {
                                                edificios[0].poblador = false;
                                            }
                                            jugador.edificios.push(edificios[0]);
                                            jugador.recursos.MET -= 2;
                                            jugador.recursos.MAD--;
                                            return jugador;
                                        }
                                    }
                                    break;
                                case 1:
                                    // Aserradero
                                    if (jugador.recursos.MAD >= 2 && jugador.recursos.MET >= 1) {
                                        if (edificiosComprados.filter(edificio => {
                                            if (edificio === "Mina" || edificio === "Aserradero") {
                                                return true;
                                            }
                                        }).count < (players.count - 1)) {
                                            edificiosComprados.push("Aserradero");
                                            if (jugador.pobladores > 0) {
                                                edificios[1].poblador = true;
                                            } else {
                                                edificios[1].poblador = false;
                                            }
                                            jugador.edificios.push(edificios[1]);
                                            jugador.recursos.MET-- ;
                                            jugador.recursos.MAD -= 2;
                                            return jugador;
                                        }
                                    }
                                    break;
                                case 2:
                                    // Corral
                                    if (jugador.recursos.MAD >= 1 && jugador.recursos.GAN >= 2) {
                                        if (edificiosComprados.filter(edificio => {
                                            if (edificio === "Corral" || edificio === "Molino") {
                                                return true;
                                            }
                                        }).count < (players.count - 1)) {
                                            edificiosComprados.push("Corral");
                                            if (jugador.pobladores > 0) {
                                                edificios[2].poblador = true;
                                            } else {
                                                edificios[2].poblador = false;
                                            }
                                            jugador.edificios.push(edificios[2]);
                                            jugador.recursos.MAD-- ;
                                            jugador.recursos.GAN -= 2;
                                            return jugador;
                                        }
                                    }
                                    break;
                                case 3:
                                    // Molino
                                    if (jugador.recursos.MET >= 1 && jugador.recursos.MAD >= 2) {
                                        if (edificiosComprados.filter(edificio => {
                                            if (edificio === "Corral" || edificio === "Molino") {
                                                return true;
                                            }
                                        }).count < (players.count - 1)) {
                                            edificiosComprados.push("Molino");
                                            if (jugador.pobladores > 0) {
                                                edificios[3].poblador = true;
                                            } else {
                                                edificios[3].poblador = false;
                                            }
                                            jugador.edificios.push(edificios[3]);
                                            jugador.recursos.MET-- ;
                                            jugador.recursos.MAD -= 2;
                                            return jugador;
                                        }
                                    }
                                    break;
                                case 4:
                                    // Mercado
                                    if (jugador.recursos.MET >= 2 && jugador.recursos.MAD >= 2 && jugador.recursos.GAN >= 1 && jugador.recursos.GRA >= 1) {
                                        if (edificiosComprados.filter(edificio => {
                                            if (edificio === "Mercado") {
                                                return true;
                                            }
                                        }).count < (players.count)) {
                                            edificiosComprados.push("Mercado");
                                            if (jugador.pobladores > 0) {
                                                edificios[4].poblador = true;
                                            } else {
                                                edificios[4].poblador = false;
                                            }
                                            jugador.edificios.push(edificios[4]);
                                            jugador.recursos.MET -= 2 ;
                                            jugador.recursos.MAD -= 2;
                                            jugador.recursos.GAN-- ;
                                            jugador.recursos.GRA--;
                                            return jugador;
                                        }
                                    }
                                    break;
                            }
                            edificioDeseado++;
                            if (edificioDeseado === 5) {
                                edificioDeseado = 0;
                            }
                            vueltaEntera++;
                        }
                    } else {
                        jugador.recursos.MAD--;
                        jugador.casas++;
                        return jugador;
                    }
                }
            }
            if (comida > 0) {
                // Llama pobladores
                if (comida > 2 && ((jugador.casas * 4) - 2) >= jugador.pobladores) {
                    jugador.pobladores += 2;
                    restarComida(jugador, 2);
                } else if (((jugador.casas * 4) - 1) >= jugador.pobladores) {
                    jugador.poladores++;
                    restarComida(jugador, 1);
                }
                return jugador;
            }
        }
        return jugador;
    }
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
        for(let i = 0; i < 2; i++) {
            players.forEach(jugador => {
                jugador = hacerAccion(jugador, 1);
            });
        }
    } else {
        for(let i = 0; i < 3; i++) {
            players.forEach(jugador => {
                jugador = hacerAccion(jugador, 2);
            });
        }
    }
    console.log('\Después de hacer las acciones:');
    console.table(players.map(p => ({ id: p.id, ...p.recursos, pv: p.pv })));
}

// Inicializar el juego y simular las 8 rondas
// Ver orden de arranque
const players = initGame(3);
for(let i = 0; i < 4; i++) {
    simularRonda(players, situacionesEra1, 1);
}
//for(let i = 0; i < 4; i++) {
    //simularRonda(players, situacionesEra2, 2);
//}

console.log('\n--- Estado Final de Jugadores ---');
console.table(players.map(p => ({ id: p.id, ...p.recursos, pv: p.pv })));
