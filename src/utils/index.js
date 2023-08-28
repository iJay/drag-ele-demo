import { nanoid } from "nanoid";

// 生成组件的唯一id
export const generateId = () => nanoid();

// 更新组件属性
export function updateComponentStyle(componentData, componentMetaData) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === componentMetaData.id) {
      const newStyleObj = componentMetaData.styleObj;
      componentData[i].style = {
        ...componentData[i].style,
        ...newStyleObj,
      };
      break;
    } else {
      updateComponentStyle(componentData[i].children, componentMetaData);
    }
  }
}

// 根据id查询相应组件 并返回该组件
export function findComponentById(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      return componentData[i];
    } else {
      const foundComponent = findComponentById(componentData[i].children, id);
      if (foundComponent) {
        return foundComponent; // 如果在子组件中找到了，返回子组件
      }
    }
  }
  return null; // 如果未找到组件，返回 null
}

// 根据id删除组件
export function deleteComponentById(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      componentData.splice(i, 1);
      break;
    } else {
      deleteComponentById(componentData[i].children, id);
    }
  }
}

// 上移
export function moveToTop(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id && componentData[i - 1]) {
      const deleteItem = componentData.splice(i, 1);
      // 上移到前一个位置
      componentData.splice(i - 1, 0, deleteItem[0]);
      break;
    }
  }
}

// 下移
export function moveToBottom(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id && componentData[i + 1]) {
      const deleteItem = componentData.splice(i, 1);
      // 下移到后一个位置
      componentData.splice(i + 1, 0, deleteItem[0]);
      break;
    }
  }
}
