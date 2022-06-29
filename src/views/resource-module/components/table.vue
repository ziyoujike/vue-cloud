<template>
    <a-table :columns="props.columns" :data-source="props.datas" bordered :pagination="false">
        <template #bodyCell="{ column, record }">
            <!-- img_url -->
            <template v-if="column.dataIndex === 'img_url'">
                <a-image :width="200" :src="record.img_url ? record.img_url : 'http://img.haihaina.cn/icon.jpg'" />
            </template>
            <template v-if="column.dataIndex === 'action'">
                <a-button type="primary" style="margin-right: 5px;" @click="btn(1, record)">编辑</a-button>
                <a-button type="primary" danger @click="btn(2, record)">删除</a-button>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>
import {resourceModule} from '@/libs/resource-module'
const props = defineProps({
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
// 编辑/删除
const emit = defineEmits(['EditorFn', 'DeleteFn'])
const btn = (e: number, record: resourceModule.tyoerecord) => {
    // 编辑
    if (e === 1) {
        emit('EditorFn', record)
    } else {
        // 删除
        emit('DeleteFn', record.id)
    }
    console.log(e, record)
}

//编辑
// const handleEditAdvertisingScreen=(e:any)=>{
//     console.log('编辑',e)
// }
// const handleClickDelTiem=(e:any)=>{
//     console.log('删除',e)
// }
</script>