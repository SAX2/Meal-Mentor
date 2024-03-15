'use client';

import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { File, Folder } from '../supabase/supabase.types';
import { usePathname } from 'next/navigation';
import { getFiles } from '../supabase/queries';

export type appFoldersType = Folder & { files: File[] | [] };

interface AppState {
  folders: appFoldersType[] | [];
}

type Action =
  | {
      type: 'SET_FOLDERS';
      payload: { folders: [] | appFoldersType[] };
    }
  | {
      type: 'ADD_FOLDER';
      payload: appFoldersType;
    }
  | {
      type: 'ADD_FILE';
      payload: { file: File; folderId: string };
    }
  | {
      type: 'DELETE_FILE';
      payload: { folderId: string; fileId: string };
    }
  | {
      type: 'DELETE_FOLDER';
      payload: { folderId: string };
    }
  | {
      type: 'SET_FILES';
      payload: { files: File[]; folderId: string };
    }
  | {
      type: 'UPDATE_FOLDER';
      payload: { folder: Partial<appFoldersType>; folderId: string };
    }
  | {
      type: 'UPDATE_FILE';
      payload: { file: Partial<File>; folderId: string; fileId: string };
    };

const initialState: AppState = { folders: [] };

const appReducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case 'SET_FOLDERS':
      return {
        ...state,
        folders: action.payload.folders.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
      };
    case 'ADD_FOLDER':
      return {
        ...state,
        folders: [...state.folders, action.payload].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
      };
    case 'UPDATE_FOLDER':
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder.id === action.payload.folderId) {
            return { ...folder, ...action.payload.folder };
          }
          return folder;
        }),
      };
    case 'DELETE_FOLDER':
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder.id !== action.payload.folderId
        ),
      };
    case 'SET_FILES':
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder.id === action.payload.folderId) {
            return {
              ...folder,
              files: action.payload.files,
            };
          }
          return folder;
        }),
      };
    case 'ADD_FILE':
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder.id === action.payload.folderId) {
            return {
              ...folder,
              files: [...folder.files, action.payload.file].sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              ),
            };
          }
          return folder;
        }),
      };
    case 'DELETE_FILE':
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder.id === action.payload.folderId) {
            return {
              ...folder,
              files: folder.files.filter(
                (file) => file.id !== action.payload.fileId
              ),
            };
          }
          return folder;
        }),
      };
    case 'UPDATE_FILE':
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder.id === action.payload.folderId) {
            return {
              ...folder,
              files: folder.files.map((file) => {
                if (file.id === action.payload.fileId) {
                  return {
                    ...file,
                    ...action.payload.file,
                  };
                }
                return file;
              }),
            };
          }
          return folder;
        }),
      };
    default:
      return initialState;
  }
};

const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
      folderId: string | undefined;
      fileId: string | undefined;
    }
  | undefined
>(undefined);

interface AppStateProviderProps {
  children: React.ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const pathname = usePathname();

  const folderId = useMemo(() => {
    const urlSegments = pathname?.split('/').filter(Boolean);
    if (urlSegments && urlSegments.length > 1) {
      return urlSegments[1];
    }
  }, [pathname]);

  const fileId = useMemo(() => {
    const urlSegments = pathname?.split('/').filter(Boolean);
    if (urlSegments && urlSegments.length > 2) {
      return urlSegments[2];
    }
  }, [pathname]);

  useEffect(() => {
    if (!folderId) return;
    const fetchFolders = async () => {
      // Aquí debes reemplazar la llamada a la función de supabase para obtener las carpetas
      // con tu lógica real.
      // Por ejemplo:
      // const { error: foldersError, data } = await getFolders();
      // if (foldersError) {
      //   console.log(foldersError);
      // }
      // if (!data) return;
      // dispatch({
      //   type: 'SET_FOLDERS',
      //   payload: { folders: data },
      // });
    };
    fetchFolders();
  }, [folderId]);

  useEffect(() => {
    console.log('App State Changed', state);
  }, [state]);

  return (
    <AppStateContext.Provider
      value={{ state, dispatch, folderId, fileId }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
