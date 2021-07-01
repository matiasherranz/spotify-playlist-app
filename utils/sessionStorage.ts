export type PlaylistsDataType = [
  {
    id: string
    title: string
    songs: [
      {
        // TODO: complete type here
      }
    ]
  }
]

// Saves into localStorage under the provided id
export const saveToStorage = (id: string, data: PlaylistsDataType): void => {
  localStorage.setItem(id, JSON.stringify(data))
}

// Retrieves from storage using the provided id
export const getFromStorage = (id: string): PlaylistsDataType | null => {
  const retrievedObject = localStorage.getItem(id)
  if (!retrievedObject) return null

  return JSON.parse(retrievedObject)
}
