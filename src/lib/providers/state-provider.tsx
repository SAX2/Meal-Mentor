// // 'use state'

// import { Dispatch, createContext, useContext, useEffect, useMemo, useReducer } from "react";
// import { Folder } from "../supabase/supabase.types";
// import { usePathname } from "next/navigation";
// import { getFiles, getFolders } from "../supabase/queries";

// // import React, {
// //   Dispatch,
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useMemo,
// //   useReducer,
// // } from 'react';
// // import { usePathname } from 'next/navigation';
// // import { File, Folder } from '@/utils/data';
// // // import { getFiles } from '../supabase/queries';


// export type appFoldersType = Folder & { files: File[] | [] };
// export type appWorkspacesType = {
//   folders: appFoldersType[] | [];
// };
// export type AppState = {
//   folders: appWorkspacesType[] | [];
// };

// type Action =
//   | {
//       type: "SET_FOLDERS";
//       payload: { folders: [] | appFoldersType[] };
//     }
//   | {
//       type: "ADD_FOLDER";
//       payload: { folder: appFoldersType };
//     }
//   | {
//       type: "ADD_FILE";
//       payload: { file: File; folderId: string };
//     }
//   | {
//       type: "DELETE_FILE";
//       payload: { folderId: string; fileId: string };
//     }
//   | {
//       type: "DELETE_FOLDER";
//       payload: { folderId: string };
//     }
//   | {
//       type: "SET_FILES";
//       payload: { files: File[]; folderId: string };
//     }
//   | {
//       type: "UPDATE_FOLDER";
//       payload: {
//         folder: Partial<appFoldersType>;
//         folderId: string;
//       };
//     }
//   | {
//       type: "UPDATE_FILE";
//       payload: {
//         file: Partial<File>;
//         folderId: string;
//         fileId: string;
//       };
//     };

// const initialState: AppState = { folders: [] };

// // const appReducer = (
// //   state: AppState = initialState,
// //   action: Action
// // ): AppState => {
// //   switch (action.type) {
// //     case 'SET_FOLDERS':
// //       return {
// //         ...state,
// //         folders: state.folders.map((folder) => {
// //           return {
// //             ...folder,
// //             folders: action.payload.folders.sort(
// //               (a, b) =>
// //                 new Date(a.createdAt).getTime() -
// //                 new Date(b.createdAt).getTime()
// //             ),
// //           };
// //         }),
// //       };
// //     case 'ADD_FOLDER':
// //       return {
// //         ...state,
// //         folders: state.folders.map((folder) => {
// //           return {
// //             ...folder,
// //             folders: [...folder.folders, action.payload.folder].sort(
// //               (a, b) =>
// //                 new Date(a.createdAt).getTime() -
// //                 new Date(b.createdAt).getTime()
// //             ),
// //           };
// //         }),
// //       };
// //     case 'UPDATE_FOLDER':
// //       return {
// //         ...state,
// //         folders: state.folders.map((folder) => {
// //             return {
// //               ...folder,
// //               folders: folder.folders.map((folder) => {
// //                 if (folder.id === action.payload.folderId) {
// //                   return { ...folder, ...action.payload.folder };
// //                 }
// //                 return folder;
// //               }),
// //             };
// //         }),
// //       };
// //     case 'DELETE_FOLDER':
// //       return {
// //         ...state,
// //         folders: state.folders.map((folder) => {
// //             return {
// //               ...folder,
// //               folders: folder.folders.filter(
// //                 (folder) => folder.id !== action.payload.folderId
// //               ),
// //             };
// //         }),
// //       };
// //     case 'SET_FILES':
// //       return {
// //         ...state,
// //         folders: state.folders.map((folder) => {
// //             return {
// //               ...folder,
// //               folders: folders.map((folder) => {
// //                 if (folder.id === action.payload.folderId) {
// //                   return {
// //                     ...folder,
// //                     files: action.payload.files,
// //                   };
// //                 }
// //                 return folder;
// //               }),
// //             };
// //         }),
// //       };
// //     case 'ADD_FILE':
// //       return {
// //         ...state,
// //         workspaces: state.workspaces.map((workspace) => {
// //           if (workspace.id === action.payload.workspaceId) {
// //             return {
// //               ...workspace,
// //               folders: workspace.folders.map((folder) => {
// //                 if (folder.id === action.payload.folderId) {
// //                   return {
// //                     ...folder,
// //                     files: [...folder.files, action.payload.file].sort(
// //                       (a, b) =>
// //                         new Date(a.created_at).getTime() -
// //                         new Date(b.created_at).getTime()
// //                     ),
// //                   };
// //                 }
// //                 return folder;
// //               }),
// //             };
// //           }
// //           return workspace;
// //         }),
// //       };
// //     case 'DELETE_FILE':
// //       return {
// //         ...state,
// //         workspaces: state.workspaces.map((workspace) => {
// //           if (workspace.id === action.payload.workspaceId) {
// //             return {
// //               ...workspace,
// //               folder: workspace.folders.map((folder) => {
// //                 if (folder.id === action.payload.folderId) {
// //                   return {
// //                     ...folder,
// //                     files: folder.files.filter(
// //                       (file) => file.id !== action.payload.fileId
// //                     ),
// //                   };
// //                 }
// //                 return folder;
// //               }),
// //             };
// //           }
// //           return workspace;
// //         }),
// //       };
// //     case 'UPDATE_FILE':
// //       return {
// //         ...state,
// //         workspaces: state.workspaces.map((workspace) => {
// //           if (workspace.id === action.payload.workspaceId) {
// //             return {
// //               ...workspace,
// //               folders: workspace.folders.map((folder) => {
// //                 if (folder.id === action.payload.folderId) {
// //                   return {
// //                     ...folder,
// //                     files: folder.files.map((file) => {
// //                       if (file.id === action.payload.fileId) {
// //                         return {
// //                           ...file,
// //                           ...action.payload.file,
// //                         };
// //                       }
// //                       return file;
// //                     }),
// //                   };
// //                 }
// //                 return folder;
// //               }),
// //             };
// //           }
// //           return workspace;
// //         }),
// //       };
// //     default:
// //       return initialState;
// //   }
// // };

// const AppStateContext = createContext<
//   | {
//       state: AppState;
//       dispatch: Dispatch<Action>;
//       folderId: string | undefined;
//       fileId: string | undefined;
//     }
//   | undefined
// >(undefined);

// interface AppStateProviderProps {
//   children: React.ReactNode;
// }

// const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(appReducer, initialState);
//   const pathname = usePathname();

//   const folderId = useMemo(() => {
//     const urlSegments = pathname?.split('/').filter(Boolean);
//     if (urlSegments)
//       if (urlSegments?.length > 2) {
//         return urlSegments[2];
//       }
//   }, [pathname]);

//   const fileId = useMemo(() => {
//     const urlSegments = pathname?.split('/').filter(Boolean);
//     if (urlSegments)
//       if (urlSegments?.length > 3) {
//         return urlSegments[3];
//       }
//   }, [pathname]);

//   useEffect(() => {
//     if (!folderId) return;
//     const fetchFiles = async () => {
//       const { error: filesError, data } = await getFolders();
//       if (filesError) {
//         console.log(filesError);
//       }
//       if (!data) return;
//     };
//     fetchFiles();
//   }, [folderId]);

//   useEffect(() => {
//     console.log('App State Changed', state);
//   }, [state]);

//   return (
//     <AppStateContext.Provider
//       value={{ state, dispatch, folderId, fileId }}
//     >
//       {children}
//     </AppStateContext.Provider>
//   );
// };

// export default AppStateProvider;

// export const useAppState = () => {
//   const context = useContext(AppStateContext);
//   if (!context) {
//     throw new Error('useAppState must be used within an AppStateProvider');
//   }
//   return context;
// };