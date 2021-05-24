<template>
    <div>
        <b-table :items= "moveData"></b-table>
    </div>
</template>
<script>
export default{
    name: 'MoveinoutTable',
    props:['moveData']
}
</script>