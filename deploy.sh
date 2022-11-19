echo "Compilando aplicación"
echo "--------------------------------------"
vite build

echo "Desplegando cambios al servidor"
echo "--------------------------------------"
scp -r dist/* baha@bahatech.cl:/opt/www/bahagames.bahatech.cl


echo "--------------------------------------"
echo "Despliegue terminado"
echo "--------------------------------------"
