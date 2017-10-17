<template>
  <div>
    <h2>Les animaux du zoo</h2>

      <!-- <button type="button" name="button" @click="showForm=true">Ajouter</button> -->

      <div class="anmials">
          <ul class="animal-list-item" v-for="a in animals">
            <li><h3>{{a.name}}</h3></li>
            <li><strong>Continent :</strong> {{a.continent_id | continent}}</li>
            <li><strong>Alimentation :</strong> {{a.food_type | foodType}}</li>
            <li></li>
            <li></li>
            <li></li>
            <li><a :href="`https://fr.wikipedia.org/${a.animal.toLowerCase()}`">{{a.animal}} sur Wikipedia</a></li>
          </ul>
        </div>
      </div>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Animals',
  data () {
    return {
      animals:[],
    }
  },
  created(){
    Vue.http.get('http://163.172.163.114:1337/animal')
    .then((data)=>{
      this.animals = data.body;
    })
  },
  filters:{
    continents(continent){
      switch(continent){
        case '1': return 'Asie'
        case '2': return 'Afrique'
        case '3': return 'Amérique du nord'
        case '4': return 'Amérique du sud'
        case '5': return 'Antarctique'
        case '6': return 'Europe'
        case '7': return 'Océanie'
        default: return 'De Mars, peut-être ?'
      }
    },
    foodType(type){
      console.log(type);
      switch(type){
        case '0': return 'Herbivore'
        case '1': return 'Carnivore'
        case '2': return 'Omnivore'
        default: return 'Des spagghettis bolognaise'
      }
    }
  }
}
</script>

<style media="screen">
  .animals{
    display: flex;
  }
  .animal-list-item{
    width:25%;
    border:none;
    background-color: #EEE;
  }
</style>
