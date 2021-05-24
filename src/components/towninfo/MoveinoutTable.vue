<template>
    <div>
        증가했는지 감소했는지,,
        <b-table :items= "moveData"></b-table>
    </div>
</template>
<script>
export default{
    name: 'MoveinoutTable',
    props:['moveData']
}
</script>