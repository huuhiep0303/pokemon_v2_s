<template>
    <div>
        <RouterLink class="button-back" to="/">&lt; Back</RouterLink>
        <div class="detail">
            <img class="img" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(pokemon.url)}.png`">
            <div class="categories">
                <div class="category" v-for="item in pokemon.types" :key="item" :class="item">
                    {{ item }}
                </div>
            </div>
            <h3 class="name">{{ pokemon.name }}</h3>
        </div>

        <div class="detail-container">
            <div class="desc">
                <p>{{ dataPromise.flavor_text }}</p>
            </div>

            <div>
                <div class="size">
                    <div class="height">
                        <p>Height</p>
                        <span>{{ dataPromise.height }}</span>
                    </div>
                    <div class="weight">
                        <p>Weight</p>
                        <span>{{ dataPromise.weight }}</span>
                    </div>
                </div>
                <div class="abilities">
                    <div class="title">
                        <p>Abilities</p>
                    </div>
                    <div class="abilities-child">
                        <div class="ability-item" v-for="ability in dataPromise.abilities" :key="ability">
                            {{ ability.ability.name }}
                        </div>
                    </div>
                </div>
                <div class="stats">
                    <div class="title">
                        <p>Stats</p>
                    </div>
                    <div class="stats-child">
                        <div class="stat-item" v-for="stat in dataPromise.stats" :key="stat">
                            <div 
                            class="stat-name" 
                            :class="getUniqueClass(stat.stat.name)"
                            >
                            {{ getIndexName(stat.stat.name) }}
                            </div>
                            <span>{{ stat.base_stat }}</span>
                        </div>
                    </div>
                </div>
                <div class="evolution">
                    <div class="title">
                        <p>Evolution</p>
                    </div>
                    <div class="evolution-child">
                        <div class="evolution-item" v-for="(evoItem, index) in pokemonArray" :key="evoItem">
                            <b v-show="index != 0">&gt;</b>
                            <span class="evoItem-name">{{ evoItem.name }}</span>
                            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(evoItem.url)}.png`" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    h1 {
        font-size: 2em;
        color: #2c3e50;
    }

    p {
        font-size: 1.2em;
        color: #34495e;
    }

    .button-back {
        position: fixed;
        top: 3%;
        left: 3%;
        border-radius: 30px;
        padding: 5px 10px;
        box-shadow: #63636333 0 5px 10px;
        border-color: transparent;
        cursor: pointer;
    }

    .button-back:hover {
        background-color: #fff;
    }

    .detail {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    h3 {
        font-size: 16px;
        color: #2c3e50;
    }

    .detail .name {
        margin-top: 10px;
        font-size: 26px;
        color: #2c3e50;
    }

    .detail-container {
        max-width: 550px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-inline: auto;
        text-align: center;
    }

    .desc {
        margin-top: 10px;
        font-size: 13px;
        color: #355f70;
    }

    .size, .abilities-child {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        gap: 100px;
    }

    .size span, .ability-item {
        display: block;
        width: 100px;
        margin: 2px;
        background-color: #f6f8fc;
        border-radius: 30px;
        text-transform: capitalize;
    }

    .size p, .abilities p, .stats p, .evolution p {
        font-size: 18px;
        font-weight: 500;
    }

    .stats-child {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 8px 0 10px;
        gap: 40px;
    }

    .stat-item {
        background-color: #F6F8Fc;
        display: flex;
        flex-direction: column;
        border-radius: 30px;
        box-shadow: #636363 0 0.5px 4px;
        padding: 5px;
        margin: 5px;
    }

    .stat-name {
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 2px;
        height: 30px;
        width: 30px;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
    }
    
    .evolution-child {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
    }

    .evolution {
        display: flex;
        flex-direction: column;
    }

    .evolution-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .evolution-item b {
        font-size: 1em;
        color: #2c3e50;
        font-weight: 600;
    }

    .evoItem-name {
        font-weight: 600;
        margin-left: 10px;
        text-transform: capitalize;
    }

    .hp {
        background-color: #DF2140;
    } 

    .atk {
        background-color: #FF994D;
    } 

    .def {
        background-color: #EECD3D;
    } 

    .spa {
        background-color: #85DDFF;
    }

    .spd-1 {
        background-color: #96DA83;
    }

    .spd-2 { 
        background-color: #FB94A8;
    }
</style>

<script setup>
    import { ref } from 'vue';
    import { getIDPokemon, fetchPromise, getIndexName, getUniqueClass } from './function';  

    let pokemon = ref(null);
    let pokemonArray = ref([]);
    let cachedPokemon = sessionStorage.getItem("pokemonData");

    if (cachedPokemon) {
        pokemon.value = JSON.parse(cachedPokemon);
    }

    let dataPromise = ref(null);
    let dataEvolution = ref({});
    async function fetchEvolutionData() {
        if (pokemon.value) {
            dataPromise.value = await fetchPromise(pokemon.value.url);
            const speciesData = await fetchPromise(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.value.name}`);
            dataEvolution.value = await fetchPromise(speciesData.evolution_chain.url);
            dataPromise.value.flavor_text = speciesData.flavor_text_entries[1].flavor_text;
        }
    }
    fetchEvolutionData();

    async function fetchEvolutionChain() {
        await fetchEvolutionData();
        let evolutionChain = [];
        let currentEvolution = dataEvolution.value.chain;
        while (currentEvolution) {
            evolutionChain.push({
                name: currentEvolution.species.name,
                url: currentEvolution.species.url
            });

            if (currentEvolution.evolves_to.length > 0) {
                currentEvolution = currentEvolution.evolves_to[0];
            } else {
                currentEvolution = null;
            }
        }
        pokemonArray.value = evolutionChain;
    }
    fetchEvolutionChain();

</script>