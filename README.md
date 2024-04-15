<div align="center">
    <h1>Auto Load Extension</h1>
</div>




## Installation
> Install Host App
- Go into the folder **h123ost_app**, and run **install_host**
- **Open [the extensions page](chrome://extensions)** in your browser: `chrome://extensions`. 
- If you did not do it already, **toggle the "developer mode"**. This is usually a toggle button at the top right of the extensions page.
- Click the button **_load unpacked extension_**.
- In the window that pops up, **select the folder that contains this extension**, then **click _ok_**.
- **Done!**

## About the project
In fact, this is a slightly difficult project in extension development.
Generally, chrome extensions cannot call or access other extensions.
Only self-developed extensions can communicate in the form of sending and receiving notifications.
To solve this problem, we used an auxiliary program that supports extension.
This cannot be realized with only general extension development technology and can be solved only with low-level technics such as operating system, Windows API, and C/C++.
