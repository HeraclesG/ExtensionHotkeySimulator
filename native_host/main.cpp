#include "mainwindow.h"

#include <QApplication>
#include <Windows.h>
#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <string.h>
#include <io.h>
#include <QJsonObject>
#include <QJsonDocument>
// #define TESTMODE
int SetBinaryMode(FILE* file)
{
    int result;

    result = _setmode(_fileno(file), _O_BINARY);
    if (result == -1)
    {
        perror("Cannot set mode");
        return result;
    }
    // set do not use buffer
    result = setvbuf(file, NULL, _IONBF, 0);
    if (result != 0)
    {
        perror("Cannot set zero buffer");
        return result;
    }

    return 0;
}

void SendKeyPress(WORD keyCode)
{
    INPUT input = { 0 };
    input.type = INPUT_KEYBOARD;
    input.ki.wVk = keyCode;  // Virtual key code of the key to be pressed

    // Set the KEYEVENTF_KEYDOWN flag to indicate a key press event
    input.ki.dwFlags = 0;

    // Send the key press event
    SendInput(1, &input, sizeof(INPUT));
}

// Function to send a key release event
void SendKeyRelease(WORD keyCode)
{
    INPUT input = { 0 };
    input.type = INPUT_KEYBOARD;
    input.ki.wVk = keyCode;  // Virtual key code of the key to be released

    // Set the KEYEVENTF_KEYUP flag to indicate a key release event
    input.ki.dwFlags = KEYEVENTF_KEYUP;

    // Send the key release event
    SendInput(1, &input, sizeof(INPUT));
}

int main(int argc, char *argv[])
{

    QApplication a(argc, argv);

    size_t iSize = 0;
    char* jsonMsg = NULL;
    unsigned char len_bytes[4];
    iSize =  fread(len_bytes, 1, 4, stdin);
    if (iSize == 4)
    {
        int iLen = len_bytes[0] | (len_bytes[1] << 8) | (len_bytes[2] << 16) | (len_bytes[3] << 24);
        // now read the message
        if (iLen > 0)
        {
            jsonMsg = (char*)malloc(8 * iLen);
            iSize = fread(jsonMsg, 1, iLen, stdin);

            QByteArray ba = QByteArray::fromRawData(jsonMsg, iLen);
            QString s = QString::fromStdString(ba.toStdString());
            s.remove('\n');
            s.remove('\r');
            QJsonDocument jsonDoc = QJsonDocument::fromJson(s.toUtf8());
            QJsonObject jsonObj = jsonDoc.object();


            bool bctrl = jsonObj["SCTRL"].toBool();
            bool bshift = jsonObj["SSHIFT"].toBool();
            bool balt = jsonObj["SALT"].toBool();
            int bcode = jsonObj["SCODE"].toInt(66);

            SendKeyRelease(VK_CONTROL);
            SendKeyRelease(VK_SHIFT);
            SendKeyRelease(VK_MENU);
            SendKeyRelease(bcode);
            if(bctrl) {

                SendKeyPress(VK_CONTROL);
            }
            if(bshift) {
                SendKeyPress(VK_SHIFT);
            }
            if(balt) {
                SendKeyPress(VK_MENU);
            }
            SendKeyPress(bcode);
            if(bctrl) {
                SendKeyRelease(VK_CONTROL);
            }
            if(bshift) {
                SendKeyRelease(VK_SHIFT);
            }
            if(balt) {
                SendKeyRelease(VK_MENU);
            }
            SendKeyRelease(VK_CONTROL);
            SendKeyRelease(VK_SHIFT);
            SendKeyRelease(VK_MENU);
            SendKeyRelease(bcode);


        }
        if (jsonMsg != NULL)
            free(jsonMsg);
    }
}
