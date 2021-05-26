<!--<template>
<div>
    <div id="vertical_space"></div>
    <b-container fluid id="background">
        <b-row>
            <b-col>dd</b-col>
            <b-col>fff</b-col>
        </b-row>
        <b-row>
           <b-col>웅앵 all rights reserved</b-col> 
        </b-row>

    </b-container>
</div>
</template>

<script>

</script>
<style scoped>
    #vertical_space{
        display: inline-block;
        height:50px;
        position:relative;
        bottom: 0;
    }
    #background{
        background-color: black;
        color: white;
        text-align: center;
        bottom:0;
        padding-top:50px;
        position:relative;
    }
</style>-->

<template>
  <v-footer class="footer" color="black" dark padless>
    <v-card
      width="100%"
      color="black"
      flat
      tile
      class="lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-2 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <h3>HappyHouse</h3>
        <br />
        Tel.042-820-7400
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>노효진 신준희 "All rights reserved"</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
};
</script>