import { stat } from "fs";
import { isDoStatement } from "typescript";
import {
  ActiveCollectionEntryCreateActionTypes,
  ActiveCollectionEntryDeleteActionTypes,
  ActiveCollectionEntryUpdateActionTypes,
  ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_START,
  ACTIVE_COLLECTION_ENTRIES_OBSERVER_STANDBY,
  ACTIVE_COLLECTION_ENTRY_CREATE_FAIL,
  ACTIVE_COLLECTION_ENTRY_CREATE_START,
  ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_DELETE_FAIL,
  ACTIVE_COLLECTION_ENTRY_DELETE_START,
  ACTIVE_COLLECTION_ENTRY_DELETE_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_UPDATE_FAIL,
  ACTIVE_COLLECTION_ENTRY_UPDATE_START,
  ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS,
} from "../../activeCollection/types";
import {
  DeleteAdonisImageActionTypes,
  DELETE_ADONIS_IMAGE_FAIL,
  DELETE_ADONIS_IMAGE_START,
  DELETE_ADONIS_IMAGE_SUCCESS,
  GetAdonisGalleryPhotosActionTypes,
  GET_ADONIS_GALLERY_PHOTOS_FAIL,
  GET_ADONIS_GALLERY_PHOTOS_START,
  GET_ADONIS_GALLERY_PHOTOS_SUCCESS,
  UploadAdonisPhotoActionTypes,
  UPLOAD_ADONIS_PHOTO_FAIL,
  UPLOAD_ADONIS_PHOTO_START,
  UPLOAD_ADONIS_PHOTO_SUCCESS,
} from "../../adonis/types";
import {
  AttributeDraftActionTypes,
  ATTRIBUTE_DRAFT_CREATE_FAIL,
  ATTRIBUTE_DRAFT_CREATE_START,
  ATTRIBUTE_DRAFT_CREATE_SUCCESS,
  ATTRIBUTE_DRAFT_DELETE_START,
  ATTRIBUTE_DRAFT_DELETE_SUCCESS,
  ATTRIUBTE_DRAFT_DELETE_FAIL,
} from "../../attributeDraft/types";
import {
  AuthenticationActionTypes,
  AUTHENTICATION_LOGIN_FAIL,
  AUTHENTICATION_LOGIN_START,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGOUT_FAIL,
  AUTHENTICATION_LOGOUT_START,
  AUTHENTICATION_LOGOUT_SUCCESS,
} from "../../authentication/types";
import {
  CategoryDraftActionTypes,
  CATEGORY_DRAFT_CREATE_FAIL,
  CATEGORY_DRAFT_CREATE_START,
  CATEGORY_DRAFT_CREATE_SUCCESS,
  CATEGORY_DRAFT_DELETE_FAIL,
  CATEGORY_DRAFT_DELETE_START,
  CATEGORY_DRAFT_DELETE_SUCCESS,
  CATEGORY_DRAFT_UPDATE_FAIL,
  CATEGORY_DRAFT_UPDATE_START,
  CATEGORY_DRAFT_UPDATE_SUCCESS,
} from "../../categoryDraft/types";
import {
  MapDialogActionTypes,
  MAP_LOCATE_UPDATE_FAIL,
  MAP_LOCATE_UPDATE_START,
  MAP_LOCATE_UPDATE_SUCCESS,
  MAP_RESOURCE_APPROVE_FAIL,
  MAP_RESOURCE_APPROVE_START,
  MAP_RESOURCE_APPROVE_SUCCESS,
  MAP_RESOURCE_REFUSE_FAIL,
  MAP_RESOURCE_REFUSE_START,
  MAP_RESOURCE_REFUSE_SUCCESS,
} from "../../mapDialog/types";
import {
  CardCollectionActionTypes,
  CardCollectionUpdateActionTypes,
  CARD_COLLECTION_CHECK_FAIL,
  CARD_COLLECTION_CHECK_START,
  CARD_COLLECTION_CHECK_SUCCESS,
  CARD_COLLECTION_UPDATE_FAIL,
  CARD_COLLECTION_UPDATE_START,
  CARD_COLLECTION_UPDATE_SUCCESS,
} from "../../special/cards/types";

import {
  GlobalStateActionTypes,
  GlobalUIState,
  GLOBAL_NOTIFICATION_CUSTOM,
  SET_GLOBAL_NOTIFICATION_CLOSED,
  SET_GLOBAL_NOTIFICATION_OPEN,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
} from "../types";

let initialState: GlobalUIState = {
  isLoading: false,
  notificationMessage: "",
  notificationOpen: false,
  notificationSeverity: "info",
};

export const globalUIReducer = (
  state = initialState,
  action:
    | GlobalStateActionTypes
    | UploadAdonisPhotoActionTypes
    | DeleteAdonisImageActionTypes
    | GetAdonisGalleryPhotosActionTypes
    | CategoryDraftActionTypes
    | AttributeDraftActionTypes
    | ActiveCollectionEntryCreateActionTypes
    | ActiveCollectionEntryDeleteActionTypes
    | ActiveCollectionEntryUpdateActionTypes
    | AuthenticationActionTypes
    | CardCollectionUpdateActionTypes
    | MapDialogActionTypes
): GlobalUIState => {
  switch (action.type) {
    case MAP_LOCATE_UPDATE_START:
      return { ...state, isLoading: true };

    case MAP_LOCATE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationSeverity: "success",
        notificationMessage:
          "A latitude e longitude do recurso foi atualizada com sucesso, não esqueça de atualizar o website para ver as mudanças",
      };

    case MAP_LOCATE_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage:
          "Ocorreu um erro durante a tentativa de atualizar a latitude e longitude do recurso. Por favor, recarregue a página e tente novamente. Se o erro persistir, entre em contato com o suporte.",
      };

    case MAP_RESOURCE_REFUSE_START:
      return { ...state, isLoading: true };

    case MAP_RESOURCE_REFUSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage:
          "O usuário foi reprovado, um e-mail notificando-o sobre sua reprovação foi enviado ao e-mail do cadastro.",
        notificationSeverity: "success",
      };

    case MAP_RESOURCE_REFUSE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage:
          "Ocorreu um erro ao tentar reprovar o inscrito, por favor, atualize a página e tente novamente.",
        notificationSeverity: "error",
      };

    case MAP_RESOURCE_APPROVE_START:
      return { ...state, isLoading: true };

    case MAP_RESOURCE_APPROVE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage:
          "Ocorreu um erro ao tentar aprovar o inscrito, por favor atualize a página e tente novamente",
        notificationSeverity: "error",
      };

    case MAP_RESOURCE_APPROVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage:
          "O inscrito foi aprovado com sucesso. Um e-mail notificando-o da confirmação foi enviado para o e-mail de cadastro deste.",
        notificationSeverity: "success",
      };

    case CARD_COLLECTION_UPDATE_START:
      return { ...state, isLoading: true };

    case CARD_COLLECTION_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: action.payload
          ? action.payload.message
          : "A checagem de cartas vencidas foi realizada com sucesso!",
        notificationSeverity: "success",
        notificationOpen: true,
      };

    case CARD_COLLECTION_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage:
          "Houve um erro ao tentar realizar a checagem de cartas vencidas, recarregue a página e tente novamente ou contate seu desenvolvedor responsável",
        notificationSeverity: "error",
        notificationOpen: true,
      };

    case ACTIVE_COLLECTION_ENTRY_UPDATE_START:
      return { ...state, isLoading: true };

    case ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Item atualizado com sucesso",
        notificationOpen: true,
        notificationSeverity: "success",
      };

    case ACTIVE_COLLECTION_ENTRY_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage: action.payload.error,
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case AUTHENTICATION_LOGIN_START:
      return { ...state, isLoading: true };

    case AUTHENTICATION_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage:
          "Houve um erro ao tentar fazer o login. Por favor, cheque suas credenciais e tente novamente.",
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case AUTHENTICATION_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Bem vindo(a)!",
        notificationOpen: true,
        notificationSeverity: "success",
      };

    case AUTHENTICATION_LOGOUT_START:
      return { ...state, isLoading: true };

    case AUTHENTICATION_LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage:
          "Houve um erro ao tentar efetuar o LOGOUT, por favor, tente novamente.",
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case AUTHENTICATION_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Até logo!",
        notificationOpen: true,
        notificationSeverity: "info",
      };

    case ACTIVE_COLLECTION_ENTRY_DELETE_START:
      return { ...state, isLoading: true };

    case ACTIVE_COLLECTION_ENTRY_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage: "Item excluído com sucesso",
        notificationSeverity: "success",
      };

    case ACTIVE_COLLECTION_ENTRY_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage:
          "Ocorreu um erro ao tentar excluir o item selecionado",
        notificationSeverity: "error",
      };

    case ACTIVE_COLLECTION_ENTRY_CREATE_START:
      return { ...state, isLoading: true };

    case ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage: "Item criado com sucesso",
        notificationSeverity: "success",
      };

    case ACTIVE_COLLECTION_ENTRY_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage: "Ocorreu um erro ao tentar criar um novo item",
        notificationSeverity: "error",
      };

    case ATTRIBUTE_DRAFT_DELETE_START:
      return { ...state, isLoading: true };

    case ATTRIBUTE_DRAFT_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Atributo deletado com sucesso",
        notificationOpen: true,
        notificationSeverity: "success",
      };

    case ATTRIUBTE_DRAFT_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage: action.payload.errorMessage,
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case ATTRIBUTE_DRAFT_CREATE_START:
      return { ...state, isLoading: true };

    case ATTRIBUTE_DRAFT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Atributo criado com sucesso",
        notificationOpen: true,
        notificationSeverity: "success",
      };

    case ATTRIBUTE_DRAFT_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage: action.payload.errorMessage,
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case CATEGORY_DRAFT_UPDATE_START:
      return {
        ...state,
        isLoading: true,
      };

    case CATEGORY_DRAFT_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Categoria atualizada com sucesso",
        notificationOpen: true,
        notificationSeverity: "success",
      };

    case CATEGORY_DRAFT_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Houve um erro ao tentar atualizar uma categoria",
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case CATEGORY_DRAFT_DELETE_START:
      return {
        ...state,
        isLoading: true,
      };

    case CATEGORY_DRAFT_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Categoria deletada com sucesso",
        notificationOpen: true,
        notificationSeverity: "success",
      };

    case CATEGORY_DRAFT_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage: action.payload.errorMessage!,
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case CATEGORY_DRAFT_CREATE_START:
      return {
        ...state,
        isLoading: true,
      };

    case CATEGORY_DRAFT_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage: "Ocorreu um erro ao tentar criar uma categoria.",
        notificationSeverity: "error",
      };

    case CATEGORY_DRAFT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationOpen: true,
        notificationMessage: "Categoria criada com sucesso",
        notificationSeverity: "success",
      };

    case GLOBAL_NOTIFICATION_CUSTOM:
      return {
        ...state,
        notificationOpen: true,
        notificationMessage: action.payload.notificationMessage,
        notificationSeverity: action.payload.notificationSeverity,
      };

    // Fetch Adonis Gallery
    case GET_ADONIS_GALLERY_PHOTOS_START:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ADONIS_GALLERY_PHOTOS_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage:
          "Houve um erro ao tentar definir as fotos da galeria. Recarregue a página",
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case GET_ADONIS_GALLERY_PHOTOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    // Delete Adonis Image
    case DELETE_ADONIS_IMAGE_START:
      return { ...state, isLoading: true };

    case DELETE_ADONIS_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationMessage: "Imagem deletada com sucesso",
        notificationOpen: true,
        notificationSeverity: "success",
      };

    case DELETE_ADONIS_IMAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        notificationMessage:
          "Ocorreu um erro ao tentar deletar uma imagem da galeria",
        notificationOpen: true,
        notificationSeverity: "error",
      };

    // General Global UI events

    case SET_GLOBAL_NOTIFICATION_OPEN:
      return { ...state };

    case SET_GLOBAL_NOTIFICATION_CLOSED:
      return { ...state, notificationOpen: false };

    case SET_LOADING_TRUE:
      return { ...state, isLoading: true };

    case SET_LOADING_FALSE:
      return { ...state, isLoading: false };

    // Adonis photo upload process  s

    case UPLOAD_ADONIS_PHOTO_START:
      return {
        ...state,
        isLoading: true,
        notificationMessage: "Upload de imagem iniciado.",
        notificationOpen: true,
        notificationSeverity: "info",
      };

    case UPLOAD_ADONIS_PHOTO_FAIL:
      return {
        isLoading: false,
        notificationMessage: "Houve um erro no upload da imagem",
        notificationOpen: true,
        notificationSeverity: "error",
      };

    case UPLOAD_ADONIS_PHOTO_SUCCESS:
      return {
        isLoading: false,
        notificationMessage: "Imagem otimizada com sucesso!",
        notificationOpen: true,
        notificationSeverity: "success",
      };

    default:
      return state;
  }
};
