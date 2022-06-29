<template>
    <a-table
        :columns="props.columns"
        :data-source="props.datas"
        bordered
        :pagination="false"
      >
      </a-table>
</template>
<script lang="ts" setup>
const props =defineProps({
    datas: {
        type: Array,
        default: () => {
            return []
        }
    },
    columns: {
        type: Array,
        default: () => {
            return []
        }
    },
})

//编辑
// const handleEditAdvertisingScreen=(e:any)=>{
//     console.log('编辑',e)
// }
// const handleClickDelTiem=(e:any)=>{
//     console.log('删除',e)
// }
</script>