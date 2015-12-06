<!---
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->

# cordova-plugin-contacts

Обеспечивает доступ к базе данных контактов устройства.

**Предупреждение**: сбор и использование данные контактов поднимает важные вопросы конфиденциальности. Политика конфиденциальности вашего приложения должна объяснять, как приложение использует контактные данные и передается ли она третьим лицам. Контактная информация считается конфиденциальной, потому что он показывает людей, с которыми общается человек. Таким образом в дополнение к политике конфиденциальности приложения, вы должны рассмотреть возможность предоставления уведомления в момент времени перед тем как приложение обращается к, или использует контактные данные, если операционная системы устройства не делает этого. Это уведомление должно обеспечивать ту же информацию, указанную выше, а также получение разрешения пользователя (например, путем представления выбора **OK** и **Нет, спасибо**). Обратите внимание, что некоторые магазины приложения могут требовать от приложения уведомления в момент доступа к данным и получить разрешение пользователя перед доступом к контактным данным. Четкая и понятная эргономика использования контактных данных помогает избежать недоразумений и ощущаемых злоупотреблений контактными данными. Для получения дополнительной информации пожалуйста, смотрите в руководстве конфиденциальности.

## Установка

    cordova plugin add cordova-plugin-contacts
    

### Особенности Firefox OS

Создайте **www/manifest.webapp** как описано в [Описание Манифеста][1]. Добавление соответствующих разрешений. Существует также необходимость изменить тип веб-приложения на «priviledged» - [Описание Манифеста][2]. **ВНИМАНИЕ**: Все привилегированные приложения применяют [Политику безопасности содержимого][3] которая запрещает встроенные скрипты. Инициализируйте приложение другим способом.

 [1]: https