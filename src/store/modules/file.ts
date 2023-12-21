import { defineStore } from 'pinia'
import type { FileItem } from '@/apis'

type ViewMode = 'grid' | 'list'

interface FileState {
  viewMode: ViewMode
  selectedFileList: FileItem[]
  isBatchMode: boolean
  grouplist: any
  loading: boolean
  status: boolean
  checkdata: Array<any>
}

export const useFileStore = defineStore({
  id: 'File',
  state: (): FileState => {
    return {
      // 视图: grid宫格模式 list列表模式
      viewMode: 'grid',
      // 是否批量操作: true:批量 false:单文件
      isBatchMode: false,
      // 当前批量勾选的文件列表
      selectedFileList: [],
      grouplist: {
        '0': [],
        '1': []
      },
      loading: false,
      status: false,
      checkdata: []
    }
  },
  getters: {
    // 当前勾选文件的id数组
    selectedFileIdList(): string[] {
      return this.selectedFileList.map((i) => i.id)
    }
  },
  actions: {
    // 改变视图模式
    changeViewMode() {
      this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid'
    },
    // 添加选中的文件到文件勾选列表
    addSelectedFileItem(item: FileItem) {
      if (this.selectedFileIdList.includes(item.id)) {
        const index = this.selectedFileList.findIndex((i) => i.id === item.id)
        this.selectedFileList.splice(index, 1)
      } else {
        this.selectedFileList.push(item)
      }
    },
    clearFileItem() {
      this.selectedFileList = []
    },
    setGrouplist(index, data) {
      this.grouplist[index] = data
    },
    // 返回事件触发
    confirm() {},
    cancel() {},
    save() {},
    setloading(bool: boolean) {
      this.loading = bool
    },
    setStatus(bool: boolean) {
      this.status = bool
    },
    setCheckdata(data) {
      this.checkdata = data
    }
  }
})
