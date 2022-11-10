# Como usar 
# 1. abra um novo terminal para não crashar com o do React
# 2. execute o seguinte comando para instalar ele como depedência

        '''yarn run json-server -w -p 3333 ./mock/database.json'''
                            Depois so abrir na porta localhost:3333
                            ou
           ''' npm run json-server -w -p 3333 ./mock/database.json''' 

# Para simplificar depois de  ter dado a linha de comando, va em package.json e adicione
                            ''' "mock" : "json-server -w -p 3333 ./mock/database.json, "
# Então basta dar yarn mock e já era!                                      