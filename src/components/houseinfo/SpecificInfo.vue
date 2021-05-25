<template>
<b-container>
    <b-row v-if= "showinfo.name">
        <b-col>
        <strong>시설명 </strong></b-col>
        <b-col cols="9">{{showinfo.name}}</b-col>
    </b-row>
    <b-row v-if= "showinfo.addr">
        <b-col>
        <strong>주소 </strong></b-col>
        <b-col cols="9">{{showinfo.addr}}</b-col>
    </b-row>

    <b-row v-if= "showinfo.telno">
    <b-col><strong>전화번호 </strong></b-col>
    <b-col cols="9"> {{showinfo.telno}}</b-col>
    </b-row>
    <b-row v-if= "showinfo.info">
        <b-col>
        <strong>세부사항 </strong> </b-col>
        <b-col cols="9"><span v-html= "showinfo.info"></span></b-col>
    </b-row>
    <b-row v-if= "showinfo.close">
        <b-col>
        <strong>공휴일 </strong></b-col> 
        <b-col cols="9">{{showinfo.close}}</b-col>
    </b-row>

</b-container>
</template>

<script>
    export default{
        props:['showinfo'],
        name:'SpecificInfo'
    }
</script>