export interface setform {
  allCheck: boolean
  checkedKeys: Array<string>
  itemList: Array<listItem>
}
export interface listItem {
  name: string
  key: string
  checked: boolean
  value: string
}