<template>
    <div class="card" @click="savePokemon_card">
        <div class="id">#{{ getIDPokemon(props.pokemon.url) }}</div>
        <img class="img" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(props.pokemon.url)}.png`">
        <h3 class="name">{{props.pokemon.name}}</h3>
        <div class="categories">
            <div class="category" v-for="item in props.pokemon.types" :key="item" :class="item">
                {{ item }}
            </div>
        </div>
    </div>
</template>


<style>
    a {
        text-decoration: none;
        color: black;
    }

    .card:hover{
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    }

    .id {
        text-align: center;
        margin-top: 0;
        color: #2c3e50;
        font-size: 15px;
        line-height: 24px;
    }

    .img {
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 150px;
    }

    .name {
        text-align: center;
        font-size: 17.55px;
        font-weight: 700;
        line-height: 28.08px;
        color: black;
        text-transform: capitalize;
    }

    .categories {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 0px;
    }

    .category {
        font-size: 13px;
        border-radius: 5px;
        /* line-height: 20.8px; */
        margin: 4px 3px;
        padding: 3px 4px;
        font-weight: 600;
        text-transform: capitalize;
        color: black;
    }

</style>

<script setup>
    import { useRouter } from 'vue-router';
    import { defineProps, defineEmits } from 'vue';
    import { getIDPokemon } from '../PokemonDetail/function';

    const props = defineProps({
        pokemon: Object
    });

    const emit = defineEmits(['select-pokemon']);
    const use_router = useRouter();

    const savePokemon_card = () => {
        sessionStorage.setItem('pokemonData', JSON.stringify(props.pokemon));
        use_router.push(`/${props.pokemon.name}`);
    };  

</script>