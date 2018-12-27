rem echo DKApp\bin\debug\*.* > dkapp.lst
rem echo DKApp\lightgallery\*.* >> dkapp.lst

set SCRIPTDIR=%~dp0

set ZIPNAME=%SCRIPTDIR%\dkapp.zip
del %ZIPNAME%

cd DKApp\bin\debug
rem E:\tools\GnuWin32\bin\gzip %ZIPNAME% *.*
"c:\program files\7-zip\7z" a %ZIPNAME% *.*
cd ..\..
dir
rem E:\tools\GnuWin32\bin\gzip -r %ZIPNAME% *.*
"c:\program files\7-zip\7z" a %ZIPNAME% -r lightgallery\*.*
cd ..
pause