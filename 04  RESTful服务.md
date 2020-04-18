## RESTful Services

RESTful服务也叫RESTful API，REST全称 **Representational State Transfer**代表性状态传输，本质上讲REST就是用来创建这些规范的HTTP服务的。我们使用简单的HTTP协议原则，去提供数据的增Create删Delete改Update查Read服务(CRUD也叫增删改查)。

现在用实际例子解释这些范例：假设有家叫Vidly的公司是做视频租凭业务的，有个用来管理用户信息的应用，在服务器上需要提供这么一个终端地址[http://vidly.com/api/customers]，客户端可以通过发送HTTP请求到这个终端来进行服务和对话。终端地址的组成：1️⃣http或https开头，这取决于请求的类型，如果你希望数据在加密的形式下传输，就需要使用https 2️⃣域名vildly.com3️⃣资源路径。请求的种类对应着要进行的操作，所有的HTTP请求都有所谓的动作或者方法，取决于它们的类型和请求目的。get用来获取数据，post发布数据，put更新数据，delete删除数据...现在以用户资源为例来解释每个方法：



  
