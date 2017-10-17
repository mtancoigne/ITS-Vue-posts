<template>
  <div class="hello">
    <h2>Derniers articles</h2>

      <button type="button" name="button" @click="showForm=true">Ajouter</button>

      <div class="post-list-item" v-for="p in posts"  :class="{deleted: p.status == '2', published: p.status == '1', draft: p.status ==  '0', gibsonized: gibsonize(p)}">
        <div class="content" v-if="!gibsonize(p)">
          <h3>
            <span v-if="['0', '1', '2'].indexOf(p.status) === -1" class="note">[Status inconnu]</span>
            <span v-if="p.status === '0'">[Brouillon]</span>
            <span v-if="p.status === '1'">[Publié]</span>
            <span v-if="p.status === '2'">[Reportz]</span>
            <span @click="postContent = p.content" class="clickable">{{p.title}}</span>
          </h3>
            <p><strong>Catégorie:</strong> {{p.category_id}}</p>
            <p class="small">
              <strong>Auteur :</strong> {{p.author}},
              <strong>Tags :</strong> {{p.tags.join(',')}}</p>
            <p>{{p.extract}}</p>
          <!-- <pre>{{p}}</pre> -->
        </div>
        <div class="content" v-else>
          <strong>{{p.author}}</strong>, votre article a été filtré <small>filtre: {{`${textFilter}`}}</small>
        </div>
      </div>

      <div class="modal" v-if="postContent !== null">
        <button type="button" name="button" @click="postContent = null" class="block">Fermer</button>
        {{postContent}}
      </div>

      <div class="modal" v-if="showForm">
        <form action="http://163.172.163.114:1337/post/create" method="post">

          <label>Titre</label>
          <input type="text" name="title" />

          <label>Extrait</label>
          <textarea name="extract" rows="8" cols="80"></textarea>

          <label>Contenu</label>
          <textarea name="content" rows="8" cols="80"></textarea>

          <label>Status:</label>
          <label class="input-label"><input type="radio" name="status" value="0"> Brouillon</label>
          <label class="input-label"><input type="radio" name="status" value="1"> Publié</label>
          <label class="input-label"><input type="radio" name="status" value="2"> Reporté</label>

          <label>Auteur</label>
          <input type="text" name="author" value="">

          <label>Catégorie</label>
          <select name="category_id">
            <option value="1">Programmation</option>
            <option value="2">Sécurité informatique</option>
            <option value="3">Réseau</option>
          </select>

          <label>Tags</label>
          <select name="tags[]" multiple>
            <option value="1">PHP</option>
            <option value="2">HTML</option>
            <option value="3">Routeurs</option>
            <option value="4">CSS</option>
            <option value="5">Hackz</option>
          </select>

          <input type="submit" value="Envoyer">
        </form>
      </div>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'List',
  data () {
    return {
      posts:[],
      postContent: null,
      textFilter: /gibson/,
      authorFilter: /moi/,
      showForm: false,
    }
  },
  created(){
    Vue.http.get('http://163.172.163.114:1337/post')
    .then((data)=>{
      this.posts = data.body;
    })
  },
  methods:{
    gibsonize(post){
      return this.textFilter.test(post.content.toLowerCase()) || this.authorFilter.test(post.author.toLowerCase())
    }
  }
}
</script>

<style media="screen">

  label{
    margin-top: 1em;
    display:block; font-weight: bold
  }
  .input-label{
    margin-top: 0;
    font-weight: normal;
  }
  textarea{
    width:100%;
    height: 20em;
  }
  textarea[name="extract"]{
    height: 5em;
  }
  *{
    box-sizing: border-box;
  }
  body{
    font-family: Ubuntu;
  }
  .gibsonized{
    color: red
  }

  .post-list-item{
    border:1px solid black;
    margin-bottom: 10px;
    padding: 10px;
  }
  .deleted{ font-style: italic; color: darkred; border-color: darkred}
  .draft{font-weight: normal; opacity: .2}
  .note{
    font-weight: normal;
    color:red;
  }
  .clickable{
    cursor: pointer;
  }
  p{
    margin:0;
  }
  .post-list-item h1, .post-list-item h2, h3, h4, h5, h6{
    padding:0;
    margin:0;
    border-bottom:1px dashed black
  }
  .small{
    font-size:.8em;
    border-bottom: 3px double #DDD;
    margin-bottom: 10px;
  }

  .modal{
    background-color: white;
    position:fixed;
    top: 25px;
    left:25px;
    right:25px;
    bottom:25px;
    padding:15px;
    box-shadow: 0 0 5px 0px rgba(0,0,0, .5);
    overflow-y: scroll;
  }
  .block{
    display: block;
    width: 100%;
    padding: 15px;
    margin-bottom:15px;
    border:1px solid rgba(0,0,0, .5);
  }
  input[type=submit]{
    background-color:lime;
    display: block;
    padding: 1em;
    width:100%;
    border: 1px solid rgba(0,0,0,.5);
    margin-top:15px;
  }
</style>
