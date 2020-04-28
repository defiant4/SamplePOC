/* Code in C to solve ssh bug in OpenWRT */

//in sl_User_utils.h,-->

/*! Macros for web user configuration */
#define USER_SYSTEM_FILE "/etc/passwd"
#define USER_SYSTEM_TEMP_FILE "/etc/passwd.user"
#define USER_FTP_FILE "/etc/vsftpd.users"
#define USER_FTP_TEMP_FILE "/etc/vsftpd_temp.users"
#define USER_SSH_TEMP_FILE "/etc/shadow"


typedef struct {
        bool bEnable;
        char sUserName[MAX_LEN_PARAM_VALUE];
        char sPassword[MAX_LEN_PARAM_VALUE];
        char sRole[MAX_LEN_PARAM_VALUE];
        bool bWeb;
        bool bSystemTelnet;
        bool bFtp;
        bool bSamba;
        bool bSSH;    //added for ssh
} UserMgmt;



//in sl_User_utils.c,-->

int sl_user_getConfigFromDb(OUT UserMgmt * pxUserCfg, IN char *pcObjName)
{
        ObjList *pxObjList = NULL;
        ObjList *pxTmpObj = NULL;
        ParamList *pxParam = NULL;
        int32_t nRet = UGW_SUCCESS;
        RespCode xRespCode;

        memset(&xRespCode, 0x0, sizeof(RespCode));

        pxObjList = HELP_CREATE_OBJ(SOPT_OBJVALUE);
        if (pxObjList == NULL) {
                LOGF_LOG_ERROR("Object creation failed for Obj: %s\n", pcObjName);
                nRet = UGW_FAILURE;
                goto End;
        }

        if (SERVD_GETVALUE_FROM_DB(pxObjList, &xRespCode, pcObjName, SOPT_LEAFNODE) == UGW_SUCCESS) {
                FOR_EACH_OBJ(pxObjList, pxTmpObj) {
                        FOR_EACH_PARAM(pxTmpObj, pxParam) {
                                switch (GET_PARAM_ID(pxParam)) {
                                        case DEVICE_USERS_USER_ENABLE:
                                                pxUserCfg->bEnable = strtol(pxParam->sParamValue, NULL, 10);
                                                break;
                                        case DEVICE_USERS_USER_USERNAME:
                                                strncpy(pxUserCfg->sUserName, pxParam->sParamValue, MAX_LEN_PARAM_VALUE);
                                                break;
                                        case DEVICE_USERS_USER_PASSWORD:
                                                strncpy(pxUserCfg->sPassword, pxParam->sParamValue, MAX_LEN_PARAM_VALUE);
                                                break;
                                        case DEVICE_USERS_USER_X_VENDOR_COM_ROLE:
                                                strncpy(pxUserCfg->sRole, pxParam->sParamValue, MAX_LEN_PARAM_VALUE);
                                                break;
                                        case DEVICE_USERS_USER_REMOTEACCESSCAPABLE:
                                                pxUserCfg->bWeb = strtol(pxParam->sParamValue, NULL, 10);
                                                break;
                                        case DEVICE_USERS_USER_X_VENDOR_COM_TELNET:
                                                pxUserCfg->bSystemTelnet = strtol(pxParam->sParamValue, NULL, 10);
                                                break;
                                        case DEVICE_USERS_USER_X_VENDOR_COM_FTP:
                                                pxUserCfg->bFtp = strtol(pxParam->sParamValue, NULL, 10);
                                                break;
                                        case DEVICE_USERS_USER_X_VENDOR_COM_SSH:
                                                pxUserCfg->bSSH = strtol(pxParam->sParamValue, NULL, 10);
                                                break;
                                }
                        }
                }
        } else {
                LOGF_LOG_ERROR("SERVD_GETVALUE_FROM_DB failed for Obj: %s\n", pcObjName);
                nRet = UGW_FAILURE;
                goto End;
        }

 End:
        if (pxObjList)
                HELP_DELETE_OBJ(pxObjList, SOPT_OBJVALUE, FREE_OBJLIST);
        return nRet;
}

/*!  \brief  This function is used to add the User data in system passwd and vsftpd users file.
  \param[in] pxUserCfg Pointer to the User config data from DB
*/
static int sl_user_addSystemFtpUser(IN UserMgmt * pxUserCfg)
{
 int nRet=UGW_SUCCESS;
        char sCommand[MAX_FILELINE_LEN] = { 0 };
        char sMd5Passwd[MAX_LEN_PARAM_VALUE] = { 0 };
        FILE *fUserFile = NULL;

        snprintf(sCommand, MAX_FILELINE_LEN, "echo -n \"%s\" |xargs openssl passwd -1", pxUserCfg->sPassword);
        if ((fUserFile = popen(sCommand, "r")) != NULL) {
                while (!feof(fUserFile)) {
                        char sFormat[MAX_FORMAT_LEN] = { 0 };
                        snprintf(sFormat, sizeof(sFormat), "%%%zus", MAX_LEN_PARAM_VALUE-1);
                        fscanf(fUserFile, sFormat, sMd5Passwd);
                }
                pclose(fUserFile);
        } else {
                LOGF_LOG_ERROR("System access password generation failed for user: %s", pxUserCfg->sUserName);
                nRet = ERR_USER_ADD;
                goto End;
        }

        if((fUserFile = fopen(USER_SYSTEM_FILE, "a")) != NULL) {
                if(pxUserCfg->bFtp ==  true && pxUserCfg->bSystemTelnet == false) {
                        if(strncmp(pxUserCfg->sRole, ROLE_SU, MAX_LEN_PARAM_VALUE) == 0) {
                                fprintf(fUserFile, "%s:%s:0:0:root:/:/dev/null\n", pxUserCfg->sUserName, sMd5Passwd);
                        } else {
                                fprintf(fUserFile, "%s:%s:201:0:%s:/mnt/usb:/dev/null\n", pxUserCfg->sUserName, sMd5Passwd, pxUserCfg->sUserName);
                        }
                } else {
                        if(strncmp(pxUserCfg->sRole, ROLE_SU, MAX_LEN_PARAM_VALUE) == 0) {
                                fprintf(fUserFile, "%s:%s:0:0:root:/:/bin/ash\n", pxUserCfg->sUserName, sMd5Passwd);
                        } else {
                                if(pxUserCfg->bSamba == true && pxUserCfg->bSystemTelnet == false) {
                                        fprintf(fUserFile, "%s:%s:201:0:Linux User:/mnt/usb:/dev/null\n", pxUserCfg->sUserName, sMd5Passwd);
                                } else {
                                        fprintf(fUserFile, "%s:%s:201:0:Linux User:/mnt/usb:/bin/ash\n", pxUserCfg->sUserName, sMd5Passwd);
                                }
                        }
                }
                fclose(fUserFile);
        } else {
                LOGF_LOG_ERROR("Failed to set user %s for system access\n", pxUserCfg->sUserName);
                nRet = ERR_USER_ADD;
                goto End;
        }



if((fUserFile = fopen(USER_SSH_TEMP_FILE, "a")) != NULL) {
  if(pxUserCfg->bSSH ==  true){  
if (pxUserCfg->bUserName == "root"){
fprintf(fUserFile, "#%s:%s:0:0:99999:7:::\n", pxUserCfg->sUserName, sMd5Passwd);
}
else{ 
   break;
}
}
else {
fprintf(fUserFile, "%s:%s:0:0:99999:7:::\n", pxUserCfg->sUserName, sMd5Passwd);
}
fclose(fUserFile);
}

else{
LOGF_LOG_ERROR("Failed to open shadow file\n");
nRet=ERR_USER_ADD;
goto End;
}



        if(pxUserCfg->bFtp ==  true) {
                if((fUserFile = fopen(USER_FTP_FILE, "a")) != NULL) {
                        fprintf(fUserFile, "%s\n", pxUserCfg->sUserName);
                        fclose(fUserFile);
                } else {
                        LOGF_LOG_ERROR("Failed to update user %s for FTP access\n", pxUserCfg->sUserName);
                        nRet = ERR_USER_ADD;
                        goto End;
                }
        }

End:
        return nRet;
}

